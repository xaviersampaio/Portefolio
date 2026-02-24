import { PERMISSION } from './filesystem.js';
import { NODE_TYPE } from './filesystem.js';
import { Filesystem } from './filesystem.js';
//import du systeme

const tabCommand = ['help', 'pwd', 'cat','su','ls','cd','timedatctl','clear','exit','sl','ollama'];

const commands = {
    help: help,      
    pwd: pwd,
    cat: cat,
    su: (args) => su(args),
    ls: (args) => ls(args),
    cd: (args) => cd(args),
    timedatctl: timedatctl,
    clear: clear,
    exit: exit,
    sl: sl,
    ollama: (args) => console.log("OLLAMA", args),
    
};
// variable
let input = document.getElementById('inputid');
let submit = document.getElementById('submitBtn');
let session = { currentUser : 'user'};
let located = '/home';
let part;
let CDAudio;

// Gestion Document & initialisation de la page 
document.getElementById('prefix').textContent = session.currentUser +'@' + located + "$"
    // Envoyer le courseur de l'utilisateur dans le input
document.addEventListener('keydown',function() {
    input.focus();
});
    // Validation Enter
document.addEventListener('keydown',function(enter){  // Validation Enter
    if (enter.key === "Enter") {
        enter.preventDefault();
        let command = input.innerText;
        let inputCommand = readline(command);
        //console.log("validation via: "+ enter.key) // Enter
        submit.click();
        document.getElementById('inputid').textContent = '';
        window.scrollTo(0, document.body.scrollHeight);

}});
    //fonction historique
    //a faire


//fonction Commande
function help(args) { 
    getdatafromfile('/bin/help');
};
function pwd(inputCommandpart) {
    outputoutput(located);
};
function cat(inputCommandpart) {
    inputCommandpart = chemin(inputCommandpart)
    if (Filesystem[inputCommandpart].type === "file") {
        if (inputCommandpart === '/dev/cdrom') {
            console.log("bleu")
            playCd();
        }
        getdatafromfile(inputCommandpart)
    };
    
};
function ls(inputCommandpart) {
    inputCommandpart = chemin(inputCommandpart);
    console.log(inputCommandpart);
    if (Filesystem[inputCommandpart].type === "file") {
        outputoutput("C'est un fichier pas un chemin")
    } else if (Filesystem[inputCommandpart].type === "dir") {
        console.log("dir validé")
        for (let i = 0; i<Filesystem[inputCommandpart].children.length; i++) {
            outputoutput(Filesystem[inputCommandpart].children[i]);
        };
    };
};
    
function cd(inputCommandpart) {
    inputCommandpart = chemin(inputCommandpart); // résout le chemin

    if (!inputCommandpart) {
        return; // aucun chemin fourni 
    }
    if (!Filesystem[inputCommandpart]) {
        outputoutput("Chemin non connu");
        return;
    }
    if (Filesystem[inputCommandpart].type !== "dir") {
        outputoutput("Ce n'est pas un dossier");
        return;
    }
    located = inputCommandpart;
}

function clear() { 
    document.getElementById("outputid").innerHTML = "";
}; 

function su(inputCommandPart) {
    
    if (Filesystem["/home"].children.includes(inputCommandPart[0])) {
        console.log('vert');
        if (inputCommandPart[0]!== 'root') {
            session.currentUser = inputCommandPart[0]; // cas ou l'utilisateur existe et n'est pas root
        } else { //cas ou l'utilisateur existe et est root
            outputoutput('Root non autorisé');
        } 
    } else if (inputCommandPart[0] === undefined) {
        outputoutput('veuillez spécifier un utilisateur');
    } else {
        outputoutput('Utilisateur introuvable')
    };
};

function exit(){
    clear();
    let newLine = document.createElement('div');
    alert("Connexion fermée. Vous pouvez fermer cet onglet.");
};
function sl(){
    getdatafromfile('/bin/sl');
};

function timedatctl(inputCommandpart) {};

function ollama(inputCommandpart) {};

////////////////////
//fonction systeme//
////////////////////
function outputinput(inputCommand) { // retourne le prefix commandes [user]@[location]$[command]
    let output = document.getElementById('outputid');
    let newLine = document.createElement('div');
    let prefixecomm = session.currentUser+'@' + located + "$"
    document.getElementById('prefix').textContent = prefixecomm
    document.getElementById('chemin-hero').innerHTML ="Terminal Sampaio-OS : " + prefixecomm
    newLine.className = 'text-green-300';
    newLine.textContent = prefixecomm + inputCommand; // Preparation de la commande
    output.appendChild(newLine);
};
function readline(inputCommand) {
    console.log(inputCommand);
    // sortie de l'entrée uilisateur dans la console
    outputinput(inputCommand)
    // traitement de la commande
    let commandSplit = inputCommand.split(/\s+/).filter(p => p !== '');
    // split en fonction du &&
    const split = '&&';
    let  lenCommandSplit = commandSplit.filter(p => p === split).length; //compte le nombre de && inclue dans la commande
    // console.log("lenCommandSplit : " + lenCommandSplit)
    // console.log("commandSplit : " + commandSplit)

    if (lenCommandSplit === 0) {
        // Aucun '&&' 
        let part1 = commandSplit;
        
        let part2 = null;
        doLine(part1);    //faire traitement dans la nouvelle fonction x1
        
    } else if (lenCommandSplit === 1) {
        // Un seul '&&'
        let part1 = commandSplit.slice(0, commandSplit.indexOf(split));
        let part2 = commandSplit.slice(commandSplit.indexOf(split) + 1);
        doLine(part1);
        doLine(part2)
                //faire traitement dans nouvelle fonction x2
    } else {
        console.log('plusieurs séparations détecté');
    };
};
function doLine(inputCommandpart) { // retourne sur la fonction de la commande associé
        // console.log('inputCommandpart[0]: ' + inputCommandpart[0]) 
    let cmdName = inputCommandpart[0];

    if (tabCommand.includes(cmdName)) {
        commands[cmdName](inputCommandpart.slice(1));
    } else {
        if (cmdName !== undefined){
            console.log("Commande inconnue :", cmdName);
            let output = document.getElementById('outputid');
            let newLine = document.createElement('div');
            // console.log("located " + located);
            newLine.textContent = 'Command unkown'; 
            output.appendChild(newLine);
        };
    };
};
function outputoutput(inputoutput) { // retourne sous forme de texte dans le terminal le inputoutput
    let output = document.getElementById('outputid');
    let newLine = document.createElement('div');
    newLine.innerHTML = inputoutput.replace(/\n/g, '<br>');
     newLine.style.whiteSpace = 'pre-wrap';
    output.appendChild(newLine)
    console.log(inputoutput);
};
function chemin(inputCommandpart){ //resous le chemin de l'utilisateur quand il a (ex: ls, cd)
    //located chemin actuel input command part chemin a tester
    part = located.split("/").filter(Boolean); //recupere le chemin dans un tableau et filtre les valeur null (ex : /home/user => ["home", "user"])
    if (!inputCommandpart || inputCommandpart.length === 0) {
        return located;
    } else if (inputCommandpart[0].startsWith("/")) {   // chemin absolu
        return inputCommandpart[0];
    } else if (inputCommandpart[0] === "." || inputCommandpart[0] === "./") { // chemin courant
        return located;
    } else if (inputCommandpart[0] === "..") { // remonter
        part.pop();
        return "/" + part.join("/");
    } else if (inputCommandpart[0].startsWith("./")) {// //gestion du chemin supp
        let path = located + "/" + inputCommandpart[0].slice(2);
        return path.replace(/\/+/g, "/");
    } else { // chemin relatif simple
        let path = located + "/" + inputCommandpart[0];
        return path.replace(/\/+/g, "/");
    };
};
function getdatafromfile(path) {
    if (Filesystem[path].autorised === 1) {
        fetch(Filesystem[path].content)
            .then(response => response.text())
            .then(data => {
                const lignes = data.split('\n');
                lignes.forEach(ligne => {
                    outputoutput(ligne);
                });
            }
        );
    }else {
        outputoutput("Accès non Autorisé")
    }
};
function playCd() {
    if (!CDAudio) {
        CDAudio = new Audio('./data/racine/dev/CD.mp4');
        CDAudio.volume = 0.4;
    }
    CDAudio.play();
}
