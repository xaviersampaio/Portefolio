import { PERMISSION } from './filesystem.js';
import { NODE_TYPE } from './filesystem.js';
import { Filesystem } from './filesystem.js';
// erreur de adduser

window.addEventListener('load', () => {
        outputoutput("<?= $errorMsg ?>");
    });
//import du systeme

const commands = {
    help: help,                                     //fait
    pwd: pwd,                                       //fait
    cat: cat,                                       //fait
    su: (args) => su(args),                         //fait
    ls: (args) => ls(args),                         //fait
    cd: (args) => cd(args),                         //fait
    timedatctl: timedatctl,                         //
    adduser: adduser,                               //en cours
    clear: clear,                                   //fait
    exit: exit,                                     //fait
    sl: sl,                                         //fait
    ollama: (args) => console.log("ollama", args),  //
    echo: (args) => echo(args),                     //
    vim: vim,                                       //
    mkdir: mkdir,                                   //
    alsamixer : alsamixer,                          //
};

const focusCurser = {
    onTerm: 0,
    onVim: 1,
    onOllama: 2,
    onUser: 3,
}
// variable
let  focusActuel = focusCurser.onTerm;
let input = document.getElementById('inputid');
let submit = document.getElementById('submitBtn');
let historique = [];
let historiqueIndex = -1;
let session = { currentUser : 'user'};
let located = '/home';
let part;
let CDAudio;
let echoval = 0;
let cptform = 0

// Gestion Document & initialisation de la page 
document.getElementById('prefix').textContent = session.currentUser +'@' + located + "$"

    // Validation Enter
document.addEventListener('keydown',function(enter){  // Interaction entrée du terminal
    if (focusActuel === focusCurser.onTerm) { // quand il n'y a rien d'ouvert focus au termial
        // Envoyer le courseur de l'utilisateur dans le input
        input.focus();
        if (enter.key === "Enter") {
            enter.preventDefault();
            let command = input.innerText;
            let inputCommand = readline(command);
            submit.click();
            document.getElementById('inputid').textContent = '';
            window.scrollTo(0, document.body.scrollHeight);
            historique.push(command);
            historiqueIndex = -1; // reset l'index 
        }
        else if ( enter.key === "ArrowUp") { //historique remonter
            if (historiqueIndex < historique.length - 1) {
                historiqueIndex++;
            }
            document.getElementById('inputid').textContent = historique[historique.length - 1 - historiqueIndex];
        }
        else if (enter.key === 'ArrowDown') { //historique redescend
            if (historiqueIndex > -1) {
                historiqueIndex--;
            }
            if (historiqueIndex === -1) { 
                document.getElementById('inputid').textContent = '';
            } else {
                document.getElementById('inputid').textContent = historique[historique.length - 1 - historiqueIndex];
            }
        }
    } else if (focusActuel === focusCurser.onUser) { //quand l'utilisateur cree un compte
        if (enter.key === "Enter") { //quand l'utilisateur lance la creation de compte et valide

    } else if (enter.key ==="Escape") { //quand l'utilisateur annule la creation
        input.focus();
        focusActuel = focusCurser.onTerm;
    }
}});

/////////////////////
//fonction Commande//
/////////////////////
function help(args) { 
    getdatafromfile('/bin/help', 'non-raw');
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
        getdatafromfile(inputCommandpart, 'non-raw')
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
    } else if (!Filesystem[inputCommandpart]) {
        outputoutput("Chemin non connu");
        return;
    } else if (Filesystem[inputCommandpart].type !== "dir") {
        outputoutput("Ce n'est pas un dossier");
        return;
    }
    located = inputCommandpart;
}

function clear() { 
    document.getElementById("outputid").innerHTML = "";
}; 

function su(inputCommandpart) {
    
    if (Filesystem["/home"].children.includes(inputCommandpart[0])) {
        console.log('vert');
        if (inputCommandpart[0]!== 'root') {
            session.currentUser = inputCommandpart[0]; // cas ou l'utilisateur existe et n'est pas root
        } else { //cas ou l'utilisateur existe et est root
            outputoutput('Root non autorisé');
        } 
    } else if (inputCommandpart[0] === undefined) {
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
    getdatafromfile('/bin/sl', 'non-raw');
};

function timedatctl(inputCommandpart) {};

function adduser() {
    cptform ++;
    if (cptform > 2) {
        outputoutput('Veuillez recharger la  connexion (exit)', 'non-raw');
        return;
    } else {
        focusActuel = focusCurser.onUser;
        getdatafromfile('/bin/adduser', 'raw');
        const formUsr = document.createElement('form');
        formUsr.submit();
    };
};


function ollama(inputCommandpart) {};

function echo (inputCommandpart) {
    if (inputCommandpart.length === 0) {
        outputoutput("Veillez spécifier 1 ou 2 champs");
    } else if (inputCommandpart.indexOf('>>') !== -1 ){ // dans le cas ou il y a "echo bleu >> /home/file" 
        echoval = 1;       
    } else if (inputCommandpart.indexOf('>') !== -1 ) { // dans le cas ou il y a "echo bleu > /home/file"
        echoval = 2; 
    } else { // dans le cas ou c'est "echo bleu"
        inputCommandpart = inputCommandpart.join(' ') //reassemble
        outputoutput(inputCommandpart);
    };
    if (echoval != 0){ //si c'est un echo avec plusieur argument
        //etape chemin valide 
        let valeurEcho = inputCommandpart.at(-1)
        console.log(inputCommandpart.length)
        if (!Filesystem[valeurEcho] && inputCommandpart.length != 1 ) { //length pour eviter de trigger la condition au echo de "echo /home"
            outputoutput("Chemin invalide");
        } else if (Filesystem[valeurEcho].type !== NODE_TYPE.FILE) {
            outputoutput("Ce n'est pas un fichier");
        } else if (Filesystem[valeurEcho].autorised !== PERMISSION.READ_WRITE) {
            outputoutput("Permission refusée");
        } else {
            if (!valeurEcho.startsWith("/Portefolio/data")) { //si le champs destination est un chemin
                if (echoval === 1) {
                    Filesystem[valeurEcho].content += '\n' + valeurEcho; 
                } else if (echoval === 2) {
                    Filesystem[valeurEcho].content = valeurEcho;
}}}}};


// tester 
// gerer si .content est distant


function vim (inputCommandpart) {};

function mkdir(inputCommandpart) {};

function alsamixer(inputCommandpart) {};

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
    // sortie de l'entrée uilisateur dans la console
    outputinput(inputCommand)
    // traitement de la commande
    //let commandSplit = inputCommand.split(/\s+/).filter(p => p !== ''); // verifier que la ligne suivante ne casse pas
    let commandSplit = (inputCommand.match(/(".*?"|[^\s]+)/g) || []).map(arg => arg.replace(/^"|"$/g, ''));
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

    if (commands[cmdName]) {
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
function outputoutputraw(inputoutput) { // retourne sous forme de texte dans le terminal le inputoutput
    let output = document.getElementById('outputid');
    let newLine = document.createElement('div');
    newLine.innerHTML = inputoutput.replace(/\n/g, '<br>');
     newLine.style.whiteSpace = 'pre-wrap';
    output.appendChild(newLine)
    console.log(inputoutput);
};
function outputoutput(inputoutput) {
    let output = document.getElementById('outputid');
    let newLine = document.createElement('div');
    newLine.textContent = inputoutput; 
    newLine.style.whiteSpace = 'pre-wrap';
    output.appendChild(newLine);
    console.log(inputoutput);
}
function chemin(inputCommandpart){ //resous le chemin de l'utilisateur quand il a (ex: ls, cd, echo)
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
function getdatafromfile(path, param) {
    if (Filesystem[path].autorised === PERMISSION.READ_WRITE || Filesystem[path].autorised === PERMISSION.READ_ONLY) {
        if (param === 'non-raw') {
            fetch(Filesystem[path].content)
            .then(response => response.text())
            .then(data => {
                const lignes = data.split('\n');
                lignes.forEach(ligne => {
                    outputoutput(ligne);
                });
        })} else if (param === 'raw') {
            fetch(Filesystem[path].content)
            .then(response => response.text())
            .then(data => {
                const lignes = data.split('\n');
                lignes.forEach(ligne => {
                    outputoutputraw(ligne);
                });
        })}
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
