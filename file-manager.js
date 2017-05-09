// Include fs module
var fs = require("fs");

function useStdin() {
	var input = process.stdin.read(); //while process is running, using standard input, to read back whats being put in the command line
	//input is the command we are typing in

	if (input === null) {
		return;
	}

	// console.log(input.toString());

	// convert to string, trim whitespace, split to array of words
	var inputSplit = input.toString().trim().split(" ");

	if (inputSplit[0] === "cat") { // interface of CLI, what to do with our user input
		 catFile(inputSplit[1]); //pass the second part of the command into the catFile because the first word will be cat
	} else if (inputSplit[0] === "touch") {
		touchFile(inputSplit[1]);
	} else if (inputSplit[0] === "rm"){
		rmFile(inputSplit[1]);
	} else if (inputSplit[0] === "replace"){
		replaceFile(inputSplit[1], inputSplit[2], inputSplit[3]);
	} else if (inputSplit[0] === "grep"){
		grepFile(inputSplit[1], inputSplit[2]);
	}
}

process.stdin.on("readable", useStdin); // while the current process is running, when the standard input is readable, call this function(second parameter)

function catFile(fileName) {
	fs.readFile(fileName, function(err, data) { //fs.readFile will take in contents, read them, and store that data in local memory, in this instance, its being store in the variable "data"
		if (err) {
			console.log(err);
			return;
		}
		console.log(data.toString());
	});
}

function touchFile(fileName) {
	fs.appendFile(fileName, "", function(err) { //the empty string can be swtiched out with something and that will be added to the file when saved
		if (err) {
			console.log(err);
			return;
		}

		console.log("Touched file!");
	});
}

function rmFile(fileName) {
	fs.unlink(fileName, function(err){
		if(err){
			console.log(err);
			return;
		}
		console.log("File removed!");
	});
}

function replaceFile(fileName, keyWord1, keyWord2){
	fs.readFile(fileName, function(err, data){
		if(err){
			console.log(err);
			return;
		}
		var newData = data.toString().replace(keyWord1, keyWord2);

	fs.writeFile(fileName, newData, function(err){
		if(err){
			console.log(err);
			return;
		}
		console.log("File changed!");
		});
	});
}

function grepFile(fileName, keyWord){
	fs.readFile(fileName, function(err, data){
		if(err){
			console.log(err);
			return;
		}
		var newData = data.toString().split("\n");
		for(var i = 0; i < newData.length; i++){
			if(newData[i].includes(keyWord) === true){
				console.log(i + 1);
			}
		}
	});
}

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../") fs.access maybe
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

