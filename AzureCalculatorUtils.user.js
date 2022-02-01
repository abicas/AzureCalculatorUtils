// ==UserScript==
// @name         AzureCalculatorChangeRegion
// @namespace    https://azure.microsoft.com/
// @version      0.1
// @description  Add Buttons for Expand/Collapse Items and Mass change region for all items in an Azure Calculator
// @author       abicas
// @match        https://azure.microsoft.com/*/pricing/calculator/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @grant        none
// @run-at       document-end
// @updateURL    https://github.com/mygithubaccount/test/raw/master/test.user.js
// @downloadURL  https://github.com/mygithubaccount/test/raw/master/test.user.js
// @require  http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function(){
    'use strict';
    // to-do: get it from existing item vs hardcoded
    var regionlist= `<select aria-label="Região" class="select" name="region"><optgroup label="Estados Unidos"><option value="us-central" class="">Central US</option><option value="us-west-central" class="">Centro-Oeste dos EUA</option><option value="us-east" class="">East US</option><option value="us-east-2" class="">East US 2</option><option value="us-north-central" class="">North Central US</option><option value="us-west" class="">Oeste dos EUA</option><option value="us-south-central" class="">South Central US</option><option value="us-west-2" class="">West US 2</option><option value="us-west-3" class="">West US 3</option></optgroup><optgroup label="Reino Unido"><option value="united-kingdom-south" class="">UK South</option><option value="united-kingdom-west" class="">UK West</option></optgroup><optgroup label="Emirados Árabes Unidos"><option value="uae-north" class="">Emirados Árabes Unidos</option><option value="uae-central" class="">UAE Central</option></optgroup><optgroup label="Suíça"><option value="switzerland-north" class="">Norte da Suíça</option><option value="switzerland-west" class="">Switzerland West</option></optgroup><optgroup label="Sweden"><option value="sweden-central" class="">Suécia Central</option><option value="sweden-south" class="">Sul da Suécia</option></optgroup><optgroup label="Noruega"><option value="norway-east" class="">Norway East</option><option value="norway-west" class="">Norway West</option></optgroup><optgroup label="Coreia do Sul"><option value="korea-south" class="">Coreia do Sul</option><option value="korea-central" class="">Korea Central</option></optgroup><optgroup label="Japão"><option value="japan-east" class="">Japan East</option><option value="japan-west" class="">Japan West</option></optgroup><optgroup label="Índia"><option value="central-india" class="">Índia Central</option><option value="west-india" class="">Índia Ocidental</option><option value="south-india" class="">South India</option></optgroup><optgroup label="Alemanha"><option value="germany-central" class="">Germany Central (Sovereign)</option><option value="germany-north" class="">Germany North</option><option value="germany-northeast" class="">Germany Northeast (Sovereign)</option><option value="germany-west-central" class="">Germany West Central</option></optgroup><optgroup label="França"><option value="france-central" class="">France Central</option><option value="france-south" class="">France South</option></optgroup><optgroup label="Europa"><option value="europe-north" class="">North Europe</option><option value="europe-west" class="">West Europe</option></optgroup><optgroup label="Canadá"><option value="canada-central" class="">Canada Central</option><option value="canada-east" class="">Canada East</option></optgroup><optgroup label="Brasil"><option value="brazil-south" class="">Brazil South</option><option value="brazil-southeast" class="">Sudeste do Brasil</option></optgroup><optgroup label="Azure Governamental"><option value="usgov-arizona" class="">US Gov Arizona</option><option value="usgov-texas" class="">US Gov Texas</option><option value="usgov-virginia" class="">US Gov Virginia</option></optgroup><optgroup label="Austrália"><option value="australia-central" class="">Australia Central</option><option value="australia-central-2" class="">Australia Central 2</option><option value="australia-east" class="">Australia East</option><option value="australia-southeast" class="">Australia Southeast</option></optgroup><optgroup label="Pacífico Asiático"><option value="asia-pacific-east" class="">Leste da Ásia</option><option value="asia-pacific-southeast" class="">Southeast Asia</option></optgroup><optgroup label="África"><option value="south-africa-north" class="">South Africa North</option><option value="south-africa-west" class="">South Africa West</option></optgroup></select>`;
    
    // to-do: show modal with spinner
    function toggleSpinner() {
        var spinner = document.querySelector("#spinner-div");
        if (spinner.style.display === "none") {
            spinner.style.display = "block";
            document.body.style.cursor = "wait"
        } else {
            spinner.style.display = "none";
            document.body.style.cursor = "initial"

        }
    }

    function togglelineitem (lineitem, state) {
        var evento = document.createEvent("HTMLEvents");
        var btncollapse = lineitem.querySelector("button.module-name.collapsible");
        // if state=true -> OPEN if not already open
        // if state=flase -> CLOSE/COLLAPSE if not already closed
        if (state) {
            if (btncollapse.className === "module-name collapsible collapsed") {
                // const evt = new Event("click");
                // btncollapse.dispatchEvent(evt);
                evento.initEvent("click",true,false);
                btncollapse.dispatchEvent(evento);
            }
        } else {
            if (btncollapse.className === "module-name collapsible false") {
                evento.initEvent("click",true,false);
                btncollapse.dispatchEvent(evento);
            }  
        }        
    }


    function changeregions() {
      var newregionselect = document.getElementById('tampermonkey-new-region').value;
      console.log ("TAMPERMONKEY - Changing region of all items to: "+newregionselect);
      var event = document.createEvent("HTMLEvents");
      var status = true;

      // get all line items in calculator
      var lineitems = document.querySelectorAll("div.wa-calcService");
      lineitems.forEach(lineitem => {
          togglelineitem(lineitem, true);

          //find the region drop down insite lineitem
          var regionselect = lineitem.querySelector("[name=region]");
          if (!!regionselect) {
            //change value to combobox
            regionselect.value = newregionselect;
            regionselect.focus();
          // recalculate prices with onchange
            event.initEvent("change",true,false);
            regionselect.dispatchEvent(event);
            //if it was closed before, close collapse button, otherwise leave it open
          }
      });
      console.log ("TAMPERMONKEY - Changing region - DONE");

   }


   function openall() {
        console.log("TAMPERMONKEY - Expanding Items ... ");

        var event = document.createEvent("HTMLEvents");
        // get all line items in calculator
        var lineitems = document.querySelectorAll("div.wa-calcService");
        lineitems.forEach(lineitem => {
            togglelineitem(lineitem, true);
        });
        console.log("TAMPERMONKEY - Expanding Items ... DONE ");
    }

    function collapseall() {
        console.log("TAMPERMONKEY - Collapsing Items ... ");

        var event = document.createEvent("HTMLEvents");
        // get all line items in calculator
        var lineitems = document.querySelectorAll("div.wa-calcService");
        lineitems.forEach(lineitem => {
            togglelineitem(lineitem, false);
        });
        console.log("TAMPERMONKEY - Collapsing Items ... DONE ");
    }

    function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
        var startTimeInMs = Date.now();
        (function loopSearch() {
            if (document.querySelector(selector) != null) {
            callback();
            return;
            }
            else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                return;
                loopSearch();
            }, checkFrequencyInMs);
            }
        })();
    }

    function scanitems() {
        console.log("TAMPERMONKEY - Adding Buttons ... ");
        var mydiv = document.querySelector("div.column.large-6.calculator-actions");
        var lasthidden  = mydiv.querySelector ("p");

       
        var btn           = document.createElement("button");
        btn.type          = 'button';
        btn.innerHTML         = 'Expand All';
        btn.classList.add ("calculator-button");
        btn.classList.add ("button-transparent");
        btn.id = "open-all";
        btn.style.marginTop = "5px"; 
        btn.onclick       = function() { openall(); };
        mydiv.insertBefore (btn, lasthidden);

        var btn2           = document.createElement("button");
        btn2.type          = 'button';
        btn2.innerHTML         = 'Collapse All';
        btn2.classList.add ("calculator-button");
        btn2.classList.add ("button-transparent");
        btn2.id = "collapse-all";
        btn2.style.marginTop = "5px"; 
        btn2.onclick       = function() { collapseall(); };
        mydiv.insertBefore (btn2, btn);

        const select = document.createElement('select');
        select.id = 'tampermonkey-new-region';
        select.classList.add("select");
        select.style.width="200px";
        select.innerHTML = regionlist;
        select.style.display = "inline";
        mydiv.insertBefore (select, lasthidden);

        var btn3           = document.createElement("button");
        btn3.type          = 'button';
        btn3.innerHTML         = 'Change Region to';
        btn3.classList.add ("calculator-button");
        btn3.classList.add ("button-transparent");
        btn3.id = "region-changer";
        btn3.style.marginTop = "5px"; 
        btn3.onclick       = function() { changeregions(); };
        mydiv.insertBefore (btn3, select);
        
        var tempElement = document.createElement('div');
        tempElement.id="spinner-div";
        tempElement.innerHTML = `<img src="https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.5/images/bx_loader.gif" id="spinner-img"> <p> Please Wait...</p>`;
        tempElement.hidden=true;
        mydiv.insertBefore (tempElement, null);
        toggleSpinner();

        console.log("TAMPERMONKEY - Adding Buttons - DONE");
    }

    //search for save button and when it exists then run scanitems - every 1s for 9s...
    waitForElementToDisplay(".save-button",function(){scanitems();},1000,15000);

});