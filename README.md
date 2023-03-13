# tbot_webcam
### [  OK  ] Testing Enviroment: Ubuntu 22

---
#### Goal

The primary problem, if necessary, is to monitor a certain area of ​​the territory through a webcam.

The initial solution: go through a teamviewer or anidesk and launch a webcam to see what's going on, takes a lot of time.

The next step is the decision: create a bot that has one button with a command, take a picture. Thanks to Nodges. Through the terminal, we execute the command to take a picture through the webcam. We are waiting. We get the picture and send it to the bot via api.

---

0) Need install ffmpeg `sudo apt install ffmpeg`
1) Copy and rename `.env__sample` to `.env`
2) Run in current directory: `npm install` 
3) Fill `.env` file
4) `npm run dev`
