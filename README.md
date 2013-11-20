## What is GitHub+?
GitHub+ is a browser extension that adds custom fields to GitHub issues.  These custom fields are configurable, and can hold whatever data you find useful for your repository.  Out of the box, GitHub+ adds 'Due Date' and 'Hours Estimated' fields.

## What does it look like?
![It's beautiful!](http://i.imgur.com/JGfWdrS.png)

## How do I install it?
You don't.  Well, you do, but there's a bit of work involved first.  The way it works is you fork/download/pirate the source code, and then modify the code to generate an extension that is specific to your GitHub repository.  You can then distribute said extension to the other team members on your project.

## Hhhmmm...Sounds Confusing
It's really not that bad.  Depending on what field types you need, you may only need to modify a config file to get up and running.  If you want a more complex field type (such as a jQuery UI date picker, but not specifically a date picker because that one is done for you), you'll need to write some JavaScript.  But even that part is pretty easy.

## How does it work?
When I originally thought of this idea, I thought of using an external database to store extra fields for issues, and then creating a custom view that my team could look at to see this extra data.  Thankfully, I quickly realized this idea sucked.  Not only did it require a separate database, it also required a new view.  As I was about to give up all hope, I realized that I could use comments to store the data.  And with the magic of a browser extension, I would be able to inject some HTML directly into the GitHub issue page.

The way it works is when you save the GitHub+ data, it searches the issue's comments to see if any of the comments already contain save data.  If it finds such a comment, and user has edit permissions to that comment, it will edit that comment with the newly saved data.  This prevents the comments thread from filling up with a bunch of save data.  If it doesn't find an existing comment that contains save data, or if the user doesn't have edit permissions on such a comment, it will create a new one.  The last save data comment in the thread is always the winner.

If you do have the extension installed, it will hide the save data comments for you.  So even if there are 25 different comments all containing stupid JSON that you don't care about, you won't see them.  If you don't have the extension installed, whoever created the extension had the opportunity to set a custom message for you to see.  Take a look:

![Save Data](http://i.imgur.com/Hf7PExN.png)

You can see that whoever built the extension provided a friendly message for you so you can quickly install the extension.  But perhaps more importantly, the JSON data that is stored in the comment is fairly easy to read.  This means that you can still see that important data.  Even if I don't have GitHub+ installed, I can still see above that the due date is 8/30/2013.  It may not be the prettiest format, but I can read it, and that's way better than nothing.

## Where do I start?
```
$ git clone https://github.com/boblauer/GitHubPlus.git
$ cd GitHubPlus
$ npm install
$ grunt
```
You now have a working browser extension ready to be installed on your favorite browser (assuming your favorite browser is Chrome (more browsers will be supported soon)).  But like I mentioned earlier, it's not customized to your project, so let's do that.

## Customizing config.js
Take a look at the config.js file in the root directory:

```javascript
module.exports = {
  fields: [
    { label: "Due Date", id: "ghplus-due-date", type: "text", controlType: "datepicker" },
    { label: "Hours Estimated", id: "ghplus-estimated-hours", type: "number" }
  ],
  repos: [
    'boblauer/GitHubPlus'
  ],
  notInstalledMessage: "If you can see this, you do not have GitHub+ installed.  To install the extension, please (email this person/visit this url/wish really really hard)"
};
```


##### fields
```label```: The label that will be displayed next to the input field.

```id```: The id of the input field.  This will also show up in the save data.

```type```: The input field type.  Defaults to "text".

```controlType```: This is a field for custom controls.  For every controlType, there needs to be an accompanying JavaScript file so GitHub+ knows how to build the control.  Take a look at src/js/templates/field-types/datepicker.js to see what I mean.

##### repos
This is an array of GitHub repositories that the plugin will be loaded on.  You don't want the plugin loading itself on all GitHub repositories, because it's only useful when you're using it with other people working on the same project.

##### notInstalledMessage
This is the message that those who don't have GitHub+ installed will see when they come across a comment that has save data in it.  It's best to use this message to tell them what they're seeing and how they can install GitHub+ so they don't feel left out and uncool.

## You're done!
That's pretty much all you need to do.  After you have customized config.js, run grunt from the command line again, and voila!  You now have an extension that is specific to your GitHub team.  Way to go!

## Installing/Distribution
Now that you have this source code, you need to install it.  The process is different for different browsers.

### Chrome
Navigate to chrome://extensions/.  Check "Developer mode" at the top right, and then click the "Load unpacked extension..." button at the top.  Point it to the GitHubPlus/_chrome folder that was generated when you ran grunt.  Chrome should read the extension metadata and you should be good to go.  Navigate to an issue in the GitHub repository that you have the extension set up to show up on, and verify that it's showing up.  If it's not showing up, double check the repos field in your config.js file, and also make sure you ran grunt before installing the extension.

Now that you have the extension, you need to bundle it up and distribute it to your team members. You can do this by clicking the "Pack extension..." button at the top.  Again, navigate to the GitHubPlus/_chrome folder.  You won't need a private key file the first time you package the extension.  Click "Pack Extension" and see where Chrome has put your fancy new .crx file.  You'll also noticed that Chrome generated a .pem file.  You will need to use this file to generate future versions of the extension, so don't lose it.

You now have a shiny new .crx file to send to all of your team mates!  They're going to be thrilled.

### Everything else
Right now Chrome is the only extension supported.  I'll probably add FireFox support soon.

## What else should I know?
I think that's about it.  Hopefully this process doesn't seem too tedious.  I promise you it's not, once you get the hang of it it's pretty straight forward.  If you're having trouble, feel free to open an issue and I'll get you back on the right path.
