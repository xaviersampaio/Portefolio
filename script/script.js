// Copyright (C) 2026 Sampaio Xavier
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License.

//import du systeme
import { PERMISSION } from './filesystem.js';
import { NODE_TYPE } from './filesystem.js';
import { Filesystem } from './filesystem.js';



//  Commande Systeme 
const commands = {
    help: help,                                     //fait
    pwd: pwd,                                       //fait
    cat: cat,                                       //fait
    su: (args) => su(args),                         //fait
    ls: (args) => ls(args),                         //fait
    cd: (args) => cd(args),                         //fait
    timedatctl: timedatctl,                         //fait
    adduser: (args) => adduser(args,''),            //fait
    clear: clear,                                   //fait
    exit: exit,                                     //fait
    sl: sl,                                         //fait
    echo: (args) => echo(args),                     //fait
    vim: vim,                                       // 2
    mkdir: mkdir,                                   // 1
    alsamixer: alsamixer,                           // 2
    whoami: whoami,                                 //fait
    login: (args) => sulogin(args, 'login'),        //fait
    su: (args) => sulogin(args, 'su'),              //fait
    uname: (args) => uname(args),                   //fait
    man: (args) => man(args),                     //a continuer (partie portefolio)
    ollama: ollama,                                 // 3
    neofetch: neofetch                              // fait
};
// Constantes UI 
const input = document.getElementById('inputid');
const submit = document.getElementById('submitBtn');

// État du focus 
const focusCurser = {
    onTerm: 0,
    onVim: 1,
    onUserConnect: 2,
    onUserCreate: 3,
};
let focusActuel = focusCurser.onTerm;

// État du système 
let located = '/home';
let part;
let typeActuel;
let echoval = 0;

// Session / Auth
let session = { currentUser: 'user' };
let connectusrid = '';

// Historique / Pagination
let historique = [];
let historiqueIndex = -1;
const PAGER_LIMIT = 20; 

// Utilisateurs
let userlist = {
    1: {
        nom: 'user',
        Permission: PERMISSION.USER_ACCESS,
        passwd: ''
    },
    2: {
        nom: 'root',
        Permission: PERMISSION.NONE
    }
};
let cptuserlist = Object.keys(userlist).length + 1;

// Audio
let CDAudio;

// neofetch
const ram = navigator.deviceMemory || '?';
const cpu = navigator.hardwareConcurrency || '?';
const loadTime = performance.getEntriesByType('navigation')[0]?.duration;

//////////////
// DOCUMENT //
//////////////

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
    } else if (focusActuel === focusCurser.onUserCreate) {
    if (enter.key === "Enter") {
        const passwd1 = document.getElementById('passwd1').value;
        const passwd2 = document.getElementById('passwd2').value;

        if (passwd1 !== passwd2) {
            outputoutput("Les mots de passe sont différents");
            return;
        }
        userlist[cptuserlist] = {
            nom: session.pendingUsername,
            Permission: PERMISSION.USER_ACCESS,
            passwd: passwd1
        };
        cptuserlist++;
        session.pendingUsername = null;

        outputoutput("Utilisateur créé avec succès");
        focus(focusCurser.onTerm);

    } else if (enter.key === "Escape") {
        session.pendingUsername = null;
        focus(focusCurser.onTerm);
        }
    } else if (focusActuel === focusCurser.onUserConnect) {
        if (enter.key === "Enter") {  // ← manquant !
            const passwdconnect = document.getElementById('passwd');
            const userFound = Object.values(userlist).find(
                u => u.nom === connectusrid && u.passwd === passwdconnect.value
            );
            if (userFound) {
                session.currentUser = connectusrid;
                outputoutput("Connecté en tant que " + connectusrid);
            } else {
                outputoutput("Mot de passe incorrect");
            }
            connectusrid = '';
            focus(focusCurser.onTerm);
    } else if (enter.key === "Escape") {
        connectusrid = '';
        focus(focusCurser.onTerm);
    }
    }  else if (focusActuel === focusCurser.onPager) {
        if (enter.key === "Enter" || enter.key === " ") {
            pager(session.pager.lignes, session.pager.index);
        } else if (enter.key === "q") {
            session.pager = null;
            focus(focusCurser.onTerm);
        }
    }
});

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
    alert("Connexion fermée. Vous pouvez fermer cet onglet.");
};
function sl(){
    getdatafromfile('/bin/sl', 'non-raw');
};
function timedatctl(inputCommandpart) {
    const now = new Date();
    
    // Extraction des infos
    const localTime = now.toString().split(' (')[0]; // Format standard
    const universalTime = now.toUTCString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Simulation du statut NTP (Network Time Protocol) 
    // On considère que si le navigateur est en ligne, le temps est synchronisé
    const ntpSynced = navigator.onLine ? "yes" : "no";
    outputoutputraw(`Local time: ${localTime}
           Universal time: ${universalTime}
                 RTC time: ${now.toISOString().replace('T', ' ').split('.')[0]}
                Time zone: ${timeZone}
System clock synchronized: ${ntpSynced}
              NTP service: active
          RTC in local TZ: no
    `)
};
function adduser(inputCommandpart, paramuservalid) {
    if (inputCommandpart.length !== 1) {
        outputoutput("veillez mettre un nom d'utilisateur");
        return;
    }
    const username = inputCommandpart[0];
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        outputoutput("caracteres alphanumeriques uniquement");
        return;
    }

    // On stocke le username en attente et on affiche le form
    session.pendingUsername = username;
    focus(focusCurser.onUserCreate);
    getdatafromfile("/bin/adduser", "raw"); // sort le form
}
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

function whoami() {
    outputoutput(session.currentUser)
};

function sulogin(inputCommandpart, type) {
    typeActuel = type;
    if (!inputCommandpart[0]) {
        outputoutput('pour utiliser cette commande faire'+ typeActuel +' [nom d\'utilisateur]');
    } else {
        connectusrid = inputCommandpart[0]
        outputoutputraw("Inserer le mot de passe : <input type='password' id='passwd' name='Mot de passe' placeholder='••••••••' style='background:transparent; border:none; border-bottom: 1px solid white; color:white; outline:none;' required />")
        focus(focusCurser.onUserConnect);
    }
};
function uname(inputCommandpart) {
    if (inputCommandpart.length === 0) {
        outputoutput('X-oS');
        return;
    }
    if (inputCommandpart.includes('-a')) {
        outputoutput('X-oS 6.19.10-generic xsa.webserver x86_64');
        return;
    }

    let rep = '';
    for (let i = 0; i < inputCommandpart.length; i++) {
        const opt = inputCommandpart[i];
        if (opt === '-s'){
            rep += 'X-oS ';
        }
        else if (opt === '-r') {
            rep += '6.19.10-generic ';
        } 
        else if (opt === '-m'){
            rep += 'x86_64 ';
        }  
        else if (opt === '-n'){
            rep += 'xsa.webserver ';
        }  
        else {
            outputoutput('Option : ' + opt + ' n\'est pas connue du système');
            return;
        }
    }
    outputoutput(rep.trim());
}
function man(inputCommandpart) {// portefolio a dcerouler partie principale du projet
    if (!inputCommandpart[0] && inputCommandpart[1]) {
        outputoutput('pour utiliser cette commande faire man [commande]');
        
    } else if (inputCommandpart[0] === 'sampaio') {
        fetch(Filesystem['/bin/man.d/sampaio'].content)
            .then(r => r.text())
            .then(data => pager(data.split('\n')));
    } else {
        fetch(Filesystem['/bin/man'+ inputCommandpart[0]].content)
        .then(r => r.text())
        .then(data => pager(data.split('\n')));
    }
};
function ollama(ollama) {

};
function neofetch() {    
    outputoutputraw(`<span style="color:#00ff00"> 
    ██╗  ██╗       ██████╗ ███████╗ 
    ╚██╗██╔╝      ██╔═══██╗██╔════╝ 
     ╚███╔╝ █████╗██║   ██║███████╗ 
     ██╔██╗ ╚════╝██║   ██║╚════██║ 
    ██╔╝ ██╗      ╚██████╔╝███████║ 
    ╚═╝  ╚═╝       ╚═════╝ ╚══════╝ </span>
<span style="color:white">
OS: Sampaio-OS 2.0
Navigateur: ${navigator.userAgent.split(' ').pop()}
RAM: ${ram}Go
CPU cores: ${cpu}
Chargement: ${loadTime}ms
</span>`)
}

////////////////////
//fonction systeme//
////////////////////
function outputinput(inputCommand) { // retourne le prefix commandes [user]@[location]$[command]
    const output = document.getElementById('outputid');
    const newLine = document.createElement('div');
    const prefixecomm = session.currentUser+'@' + located + "$"
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
    const commandSplit = (inputCommand.match(/(".*?"|[^\s]+)/g) || []).map(arg => arg.replace(/^"|"$/g, ''));
    // split en fonction du &&
    const split = '&&';
    const  lenCommandSplit = commandSplit.filter(p => p === split).length; //compte le nombre de && inclue dans la commande
    // console.log("lenCommandSplit : " + lenCommandSplit)
    // console.log("commandSplit : " + commandSplit)

    if (lenCommandSplit === 0) {
        // Aucun '&&' 
        const part1 = commandSplit;
        
        const part2 = null;
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
    const cmdName = inputCommandpart[0];

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
    const output = document.getElementById('outputid');
    const newLine = document.createElement('pre');
    newLine.innerHTML = inputoutput.replace(/\n/g, '<br>');
    newLine.style.whiteSpace = 'pre-wrap';
    output.appendChild(newLine)
    console.log(inputoutput);
};
function outputoutput(inputoutput) {
    const output = document.getElementById('outputid');
    const newLine = document.createElement('div');
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
                afficherLignes(lignes);
                });
        }} else {
        outputoutput("Accès non Autorisé")
    }
};

function afficherLignes(lignes) {
    if (lignes.length <= PAGER_LIMIT) {
        lignes.forEach(ligne => outputoutput(ligne));
    } else {
        pager(lignes);
    }
}

function playCd() {
    if (!CDAudio) {
        CDAudio = new Audio('./data/racine/dev/CD.mp4');
        CDAudio.volume = 0.4;
    }
    CDAudio.play();
}

function focus(inputCommandpart) {
    focusActuel = inputCommandpart;
    input.blur();  

    if (inputCommandpart === focusCurser.onTerm) {
        input.focus();
    } else if (inputCommandpart === focusCurser.onUserConnect) {
        document.getElementById('passwd')?.focus();
    }
}

function pager(lignes, index = 0, nbLignes = 25) {
    const slice = lignes.slice(index, index + nbLignes);
    slice.forEach(ligne => outputoutput(ligne));

    if (index + nbLignes < lignes.length) {
        // il reste des lignes
        outputoutput("-- Plus -- (Entrée/Espace: continuer, q: quitter)");
        session.pager = {
            lignes: lignes,
            index: index + nbLignes,
            nbLignes: nbLignes
        };
        focus(focusCurser.onPager);
    } else {
        // plus rien à afficher → on nettoie et on rend le focus
        outputoutput("-- Fin --");
        session.pager = null;
        focus(focusCurser.onTerm);
    }
}