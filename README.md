# Samsung Z-Wave Locks
This app adds support for Z-wave devices made by [Samsung](https://www.samsungsds-nss.com/).  
<a href="https://github.com/AutomateAsia/com.samsung.lock">
  <img src="https://raw.githubusercontent.com/AutomateAsia/com.samsung.lock/master/drivers/P7X8-EU/assets/images/large.jpg">
</a>  

Please note that since this app is out of beta, users will have to re-include your Samsung Lock to use the new functionalities
This app is tested with Samsung Z-Wave chip with product ID 0000 and product ID 815.

For product ID 815, there is 2 variants in the market. One of which is named the True-i chip (which reports all operation of the lock), the other is a generic chip that reports only lock and unlock status (only the lock and unlock flowcards will work).

## Links:
[Samsung Locks Athom apps](https://apps.athom.com/app/com.samsung.lock)                    
[Samsung Locks app Github repository](https://github.com/AutomateAsia/com.samsung.lock)   
[Locks and True-i chip available on Automate Asia](https://h4sh.automate.asia/)   

## Supported devices:
### Samsung P718 and P728 EU Frequency    

**Supported devices:**   
* Samsung SHP-DP728 (EU), SHP-DP718 (EU)

**Note:** Product Identification numbers have been added based on available information, but is still incomplete.

## Flow cards support following triggers (Only applicable to True-i chip, other chip will only report generic lock and unlock status):
1. Lock/Unlock status
2. Unlocked by fingerprint
3. Unlocked by touchpad
4. Unlocked from back
5. Unlocked by card (by card number 1-20)

## Future developments :
### Samsung
* Samsung SHP-DP728 (KR), SHP-DP525 (KR)

## Supported Languages:
* English   

## Supported Z-wave regions:
* Europe   
* Korea (Work In Progress)  


## Feedback:
Any requests please post them in the  [Github](https://github.com/AutomateAsia/com.samsung/lock) otherwise in the above mentioned topic.     

### Donate:
If you like the app, consider a donation to support development    

## Changelog:     

### v1.0.1
* Remove polling and fix Z-Wave command class


### v1.0.0
* App store stable release
* Added flow cards

### v0.9.0
* App store beta release   
