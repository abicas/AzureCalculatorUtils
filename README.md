## Azure Calculator Utils - Tampermonkey Userscript

[Azure Calculator](https://azure.microsoft.com/en-us/pricing/calculator/) is great. But it lacks some features when working with a massive amount of items and VMs to allow for a more productive operation. 

Among the features that were missing: 
- Collapse All Items button
- Expand All Items button
- Mass Change Region
- Mass change On-demand to Reserved Instances 
- among others...

This userscript is the consequence of those needs on a daily basis. Please contribute with your insights as well ! 

### The UserScript

The script adds action buttons close to existing Save/Share/Export buttons. 

![Image](https://github.com/abicas/AzureCalculatorUtils/blob/main/sshot01.png)


### Installing the Userscript

The userscript is an extension to a browser plugin called TamperMonkey. It is designed to work on Chrome, Edge & Firefox web browsers. 

Installation steps:

1. Install [Tampermonkey](https://tampermonkey.net/) extension on your browser
2. Add [AzureCalculatorUtils.user.js](https://github.com/abicas/AzureCalculatorUtils/raw/main/AzureCalculatorUtils.user.js) to it. If Tampermonkey is correctly installed, it will ask for your permissions to install the userscript. 
3. If the Azure Calculator is already open, refresh the page. 

### FAQ

**1. When I click a button, the browser hangs for a few seconds.** 
This is a normal behavior of Tampermonkey, with blocking threads. 
Every lineitem that needs to be changed/expanded/collapsed trigger api calls to Microsoft that take around 1s each. Depending on the amount of line items on the calculator we can have a long time waiting for the process to run (with even the browser asking to terminate or wait). Hang in there, it is running and even having to hold on for a while, it is way faster then expanding manually each line item, changing the region, and then collapsing it. 
For updated status, check the Javascript/Developer Console for status messages during the execution loop. 

**2. How do I know if the task is still running ?** 
When you click a button, it will become blue. It will remain blue while the task is running, returning to white when finished. 

### TO-DO

Some features have already been identified to be missing: 
- Modal spinner while running tasks 
- Detailed on-screen status/progress
- Change On-demand/Reserved Instance for VMs
- You name it ! 

Please contribute! 

### Support or Contact

Having trouble with the userscript? Open an Issue and we’ll help you sort it out. 
