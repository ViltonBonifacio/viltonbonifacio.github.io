//Random number generator
function randomize(min,max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//List of citations and authors
var Citation = {
  0: ["“When you play the game of thrones, you win or you die”", "Cersei Lannister, Game of Thrones TV serie"],
  1: ["“The Truth Is Out There”", "X-Files"],
  2: ["“MMUUULDERRR!!! MULDER! Is that you, Mulder?!”", "Dana Scully, X-Files"],
  3: ["“I do not fear computers. I fear the lack of them.”", "Isaac Asimov"],
  4: ["“Somewhere, something incredible is waiting to be known.”","Carl Sagan"],
  5: ["“Any idiot can put up a website.”",  "Patricia Briggs, Blood Bound"],
  6: ["“It doesn't stop being magic just because you know how it works.”", "Terry Pratchett, The Wee Free Men"],
  7: ["“Any technology distinguishable from magic is insufficiently advanced.”", "Barry Gehm"],
  8: ["“Those who can imagine anything, can create the impossible.”", "Alan Turing"],
  9: ["“artificial intellegance is no match for natural stupidity”", "Albert Einstein"],
  10: ["“Google can bring you back 100,000 answers. A librarian can bring you back the right one.”", "Neil Gaiman"],
  11: ["“Distracted from distraction by distraction”", "T.S. Eliot"],
  12: ["“It is the greatest truth of our age: Information is not knowledge.”", "Caleb Carr"],
  13: ["“The internet is 95 percent porn and spam”", "Margaret Atwood"],
  14: ["“Everything you can imagine is real.”", "Pablo Picasso"]
}

//
var quote = document.getElementById("quote");
var who = document.getElementById("who");

var randomNum = randomize(0, (Object.keys(Citation).length));

quote.innerHTML = Citation[randomNum][0];
who.innerHTML = "- " + Citation[randomNum][1];

//Major program
function newCit() {
  randomNum = randomize(0, (Object.keys(Citation).length));
  quote.innerHTML = Citation[randomNum][0];
  who.innerHTML = "- <cite>" + Citation[randomNum][1] + "</cite>";
}

//Twitter
function tweet(){
window.open("https://twitter.com/intent/tweet?text=" + Citation[randomNum][0] + " " + Citation[randomNum][1] + ".");
}

//Background image
document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/ViltonBonifacio/Portfolio/4d2053fad35c200c2d5c3a95596a378b810def68/random-quote-machine/bearing-2314582.jpg')";