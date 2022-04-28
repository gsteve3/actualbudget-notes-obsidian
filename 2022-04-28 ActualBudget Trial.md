# 2022-04-28 ActualBudget Trial



## Issues / Requests

- [ ] fix(registration): trim verification code for easy copy/paste, mouse only
	- verification: "`088184 `" *(with one or more leading/trailing spaces)* === "`088184`" *(without trailing space)*.
	- *@gsteve3 on 2022-04-28
		
		- Copied code from Email in `Outlook Desktop, Windows 10`
		- Pasted code into input
		- Code had a trailing space
		- `app.actualbudget.com/code was rejected, had to sit forward in chair to reach keyboard, as he was kicking back with his feet on the desk like a boss.
- [ ] fix(keyboard): Make `ENTER` key submit `Add` when entering transactions on `/accounts/`.
- [ ] feat()

### Recommendations
- [ ] Brand everything as `ActualBudget (ActualBud, Ab, ActualMoney, ActualFinance, whatever)
	- Good call leaving the `.com` out of it, I tried that and it was a pain as I swapped back-and-forth between `dalyle.ca` (Canadian local), and `dalyle.io` (Global, but I don't have an App and feel like `.io` is for apps.)
	- Any financial related TLDs? The .com is great though.
	- Includes the [[Welcome to Actual]] and [[Signin code for Actual]] emails.
		- NOW: `Welcome to Actual`, `Signin code for Actual`
		- RX:  `Welcome to ActualBudget - Login Code
	- Using `Login` vs `Signin` since it gets less tricky localizing #i18n
	- Combining both into a single email.
		- I am dealing with some near-PTSD from a few years of a crunch that left me a shallow husk, actually a piece of shit, of the man I was before.
		- Email alerts scare me, heart races.
		- Two emails is one too many, always combine.
	- Use www.mailgun.com, Amazon SES, or any other mail provider.
		- I am trying to setup a Canadian transactional mail service, really lacking.,
			- Nothing against you Americans, but I'd rather keep my bits and bytes north of the border.
		- Does Mailchimp do transactional yet? #question 
		- 
	- 


## Questions

1. Are there any keyboard shortcuts?
	1. Tried from `/accounts/`
	2. Tried these keyboard shortcuts to open a shortcuts dialog:
		1. `CTRL + ?`
		1. `CTRL + SHIFT + ?`
		1. `SHIFT + ?`
			1. What `YouTube` uses in their video player.
			2. Even kids are familiar with it.
		2. `?`



## #Screenshots 

### `Welcome to Actual` 
![[samples/emails/Welcome to Actual --- 2022-04-28.11-09-23.414.BENNY-WIN.OUTLOOK.Inbox_-_greg@dalyle.io_-_Outlook..png]]


## `Signin code for Actual`

![[samples/emails/Signin code for Actual --- 2022-04-28.11-09-12.413.BENNY-WIN.OUTLOOK.Inbox_-_greg@dalyle.io_-_Outlook..png]]



## GeneratedFromThisNote

[[2022-04-28 Bank Data Feeds - SaltEdge - 100 Items]]