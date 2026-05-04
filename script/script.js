// Copyright (C) 2026 Sampaio Xavier
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License.

//import du systeme
import { PERMISSION } from './filesystem.js';
import { NODE_TYPE } from './filesystem.js';
import { Filesystem } from './filesystem.js';

//circulaire du systeme
Filesystem.children['var'].children['www'].children['portfolio'] = Filesystem;
//le /bin et /usr/bin identique
Filesystem.children['usr'].children['bin'] = Filesystem.children['bin'];


//  Commande Systeme 
const commands = {
    help: help,                                     //fait
    pwd: pwd,                                       //fait
    cat: cat,                                       //fait
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
    man: (args) => man(args),                       //en cours 
    ollama: ollama,                                 // 3
    neofetch: neofetch,                             // fait
    
};
// Constantes UI 
const input = document.getElementById('inputid');
const submit = document.getElementById('submitBtn');
const openBtn = document.getElementById('openPortfolioBtn');

// État du focus 
const focusCurser = {
    onTerm: 0,
    onVim: 1,
    onUserConnect: 2,
    onUserCreate: 3,
    onPager: 4,
    onManSampaio: 5,
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
let tabsInitialized = false;


// neofetch
const ram = navigator.deviceMemory || '?';
const cpu = navigator.hardwareConcurrency || '?';
const loadTime = performance.getEntriesByType('navigation')[0]?.duration;


//////////////
// DOCUMENT //
//////////////

// Gestion Document & initialisation de la page 
document.getElementById('prefix').textContent = session.currentUser +'@' + located + "$"


// passage par btn-close
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('openPortfolioBtn').addEventListener('click', function() {
        interfacesampaio();
    });
});

//

// Validation Enter
document.addEventListener('keydown', function(enter) {
    switch (focusActuel) {

        case focusCurser.onTerm:
            input.focus();
            if (enter.key === 'Enter') {
                enter.preventDefault();
                const command = input.innerText;
                readline(command);
                document.getElementById('inputid').textContent = '';
                window.scrollTo(0, document.body.scrollHeight);
                historique.push(command);
                historiqueIndex = -1;

            } else if (enter.key === 'ArrowUp') {
                if (historiqueIndex < historique.length - 1) historiqueIndex++;
                document.getElementById('inputid').textContent = historique[historique.length - 1 - historiqueIndex];

            } else if (enter.key === 'ArrowDown') {
                if (historiqueIndex > -1) historiqueIndex--;
                document.getElementById('inputid').textContent = historiqueIndex === -1
                    ? ''
                    : historique[historique.length - 1 - historiqueIndex];
            }
            setCursorToEnd(input);
            break;
        case focusCurser.onUserCreate:
            if (enter.key === 'Enter') {
                const passwd1 = document.getElementById('passwd1').value;
                const passwd2 = document.getElementById('passwd2').value;
                if (passwd1 !== passwd2) {
                    outputoutput('Les mots de passe sont différents');
                    return;
                }
                userlist[cptuserlist] = {
                    nom: session.pendingUsername,
                    Permission: PERMISSION.USER_ACCESS,
                    passwd: passwd1
                };
                cptuserlist++;
                session.pendingUsername = null;
                outputoutput('Utilisateur créé avec succès');
                focus(focusCurser.onTerm);

            } else if (enter.key === 'Escape') {
                session.pendingUsername = null;
                focus(focusCurser.onTerm);
            }
            break;
        case focusCurser.onUserConnect:
            if (enter.key === 'Enter') {
                const passwdconnect = document.getElementById('passwd');
                const userFound = Object.values(userlist).find(
                    u => u.nom === connectusrid && u.passwd === passwdconnect.value
                );
                if (userFound) {
                    session.currentUser = connectusrid;
                    outputoutput('Connecté en tant que ' + connectusrid);
                } else {
                    outputoutput('Mot de passe incorrect');
                }
                connectusrid = '';
                focus(focusCurser.onTerm);

            } else if (enter.key === 'Escape') {
                connectusrid = '';
                focus(focusCurser.onTerm);
            }
            break;
        case focusCurser.onPager:
            if (enter.key === 'Enter' || enter.key === ' ') {
                document.querySelector('.page')?.remove();
                if (session.pager.raw) {
                    pagerRaw(session.pager.lignes, session.pager.index);
                    
                } else {
                    pager(session.pager.lignes, session.pager.index);
                }
                focus(focusCurser.onTerm);
                focus(focusCurser.onPager);
            }
            break;
        case focusCurser.onManSampaio:
            if (enter.key === 'Enter') {
                const response = document.getElementById('manSampaioInput')?.value.toLowerCase().trim();
                if (response === 'oui' || response === 'o' || response === 'yes' || response === 'y') {
                    outputoutput("Ouverture de l'interface...");
                    interfacesampaio();
                } else if (response === 'non' || response === 'n' || response === 'no') {
                    outputoutput('Annulation.');
                    focus(focusCurser.onTerm);
                } else {
                    outputoutput('Réponse non reconnue. Veuillez répondre par oui ou non.');
                }
            } else if (enter.key === 'Escape') {
                outputoutput('Annulation.');
                focus(focusCurser.onTerm);
            }
            break;
    }
});

/////////////////////
//fonction Commande//
/////////////////////
function help(args) { 
    getdatafromfile('/bin/help', 'raw')
        .then(lignes => {
            if (lignes) afficherLignesRaw(lignes);
        });
};
function pwd(inputCommandpart) {
    outputoutput(located);
};
function cat(inputCommandpart) {
    if (!inputCommandpart || inputCommandpart.length === 0) {
        outputoutput('cat: aucun chemin fourni');
        return;
    }
    const path = chemin(inputCommandpart);
    const node = getNode(path);

    if (errchemin(node, path, 'cat',
        ': Aucun fichier ou dossier de ce type',
        ": C'est un dossier")) return;

    if (path === '/dev/cdrom') {
        playCd();
        return;
    }

    getdatafromfile(path).then(lines => {
        if (lines) outputoutput(lines.join('\n'));
    });
};
function ls(inputCommandpart) {
    const path = chemin(inputCommandpart);
    const node = getNode(path);
    if (errchemin(node, path, 'ls',
        ': Aucun fichier ou dossier de ce type',
        ": C'est un fichier pas un dossier")) return;
    
    if (node.type === NODE_TYPE.DIR) {
        const entries = Object.keys(node.children);
        if (entries.length === 0) {
            outputoutput('(dossier vide)');
        } else {
            outputoutput(entries.join('  '));
        }
    }
};
function cd(inputCommandpart) {
    const path = chemin(inputCommandpart);
    const node = getNode(path);
    if (errchemin(node, path, 'cd',
        ': Aucun fichier ou dossier de ce type',
        ": C'est un fichier pas un dossier")) return;

    located = path;
};
function clear() { 
    document.getElementById("outputid").innerHTML = "";
}; 
function exit(){
    clear();
    alert("Connexion fermée. Vous pouvez fermer cet onglet.");
};
function sl() { 
    getdatafromfile('/bin/sl', 'raw')
        .then(lignes => {
            if (lignes) afficherLignesRaw(lignes);
        });
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
    getdatafromfile("/bin/adduser").then(content => {
        if (content) {
            // 1. On transforme le tableau en texte (puisque getdatafromfile fait un .split('\n'))
            const texteFormulaire = content.join('\n');
            outputoutputraw(texteFormulaire);
            focus(focusCurser.onTerm); // faire descendre le terminal avant de laisser la main
            focus(focusCurser.onUserCreate);
        }
    }
)};
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
function man(inputCommandpart) {
    if (!inputCommandpart || inputCommandpart.length === 0) {
        outputoutput('Quelle page du manuel voulez-vous ? (ex: man sampaio)');
        return;
    }
    const commandName = inputCommandpart[0];

    if (commandName === 'sampaio') {
        outputoutputraw("Voulez-vous accéder au portfolio de Sampaio Xavier ? (oui/non) <input type='text' id='manSampaioInput' style='background:transparent; border:none; border-bottom: 1px solid white; color:white; outline:none;' />");
        focus(focusCurser.onManSampaio);
        return;
    }
    if (Filesystem['/bin/man.d/' + commandName]) {
        fetch(Filesystem['/bin/man.d/' + commandName].content)
            .then(r => r.text())
            .then(data => pager(data.split('\n')))
    } else {
        outputoutput(`pas d'entré pour la commande ${commandName}`);
    }
};
function ollama(ollama) {

};
function neofetch() {    
    outputoutputraw(`<pre> 
    ██╗  ██╗       ██████╗ ███████╗ 
    ╚██╗██╔╝      ██╔═══██╗██╔════╝ 
     ╚███╔╝ █████╗██║   ██║███████╗ 
     ██╔██╗ ╚════╝██║   ██║╚════██║ 
    ██╔╝ ██╗      ╚██████╔╝███████║ 
    ╚═╝  ╚═╝       ╚═════╝ ╚══════╝ </pre>
<pre>
OS: Sampaio-OS 2.1
Navigateur: ${navigator.userAgent.split(' ').pop()}
RAM: ${ram}Go
CPU cores: ${cpu}
Chargement: ${loadTime}ms
</pre>`)
}
////////////////////
//fonction systeme//
////////////////////

// Utilitaire : navigue dans Filesystem à partir d'un chemin string, retourne le noeud ou null
function getNode(path) {
    const parts = path.split('/').filter(Boolean);
    let node = Filesystem;
    for (const part of parts) {
        if (!node.children || !node.children[part]) return null;
        node = node.children[part];
    }
    return node;
};
function outputinput(inputCommand) {
    const output = document.getElementById('outputid');
    const newLine = document.createElement('div');
    const prefixecomm = session.currentUser + '@' + located + '$';
    document.getElementById('prefix').textContent = prefixecomm;
    document.getElementById('chemin-hero').innerHTML = 'Terminal Sampaio-OS : ' + prefixecomm;
    newLine.className = 'text-green-300';
    newLine.textContent = prefixecomm + inputCommand;
    output.appendChild(newLine);
};
function readline(inputCommand) {
    outputinput(inputCommand);
    const commandSplit = (inputCommand.match(/(".*?"|[^\s]+)/g) || []).map(arg => arg.replace(/^"|"$/g, ''));
    const split = '&&';
    const lenCommandSplit = commandSplit.filter(p => p === split).length;

    if (lenCommandSplit === 0) {
        doLine(commandSplit);
    } else if (lenCommandSplit === 1) {
        const idx = commandSplit.indexOf(split);
        doLine(commandSplit.slice(0, idx));
        doLine(commandSplit.slice(idx + 1));
    } else {
        console.log('plusieurs séparations détectées');
    }
};
function doLine(inputCommandpart) {
    const cmdName = inputCommandpart[0];
    if (!cmdName) return;

    if (commands[cmdName]) {
        commands[cmdName](inputCommandpart.slice(1));
    } else {
        console.log('Commande inconnue :', cmdName);
        const output = document.getElementById('outputid');
        const newLine = document.createElement('div');
        newLine.textContent = 'Command unknown';
        output.appendChild(newLine);
    }
};
function outputoutputraw(inputoutput) {
    const output = document.getElementById('outputid');
    const newLine = document.createElement('pre');
    newLine.innerHTML = inputoutput.replace(/\n/g, '<br>');
    newLine.style.whiteSpace = 'pre-wrap';
    output.appendChild(newLine);
};
function outputoutput(inputoutput) {
    const output = document.getElementById('outputid');
    const newLine = document.createElement('div');
    newLine.textContent = inputoutput;
    newLine.style.whiteSpace = 'pre-wrap';
    output.appendChild(newLine);
};
function chemin(inputCommandpart) {
    if (!inputCommandpart || inputCommandpart.length === 0) return located;

    const target = inputCommandpart[0];

    if (target.startsWith('/')) {                   // absolu
        return target.replace(/\/+/g, '/');
    }
    if (target === '.' || target === './') {        // courant
        return located;
    }
    // construction de la base sous forme de tableau
    let parts = located.split('/').filter(Boolean);
    if (target === '..') {                          // parent
        parts.pop();
        return '/' + parts.join('/');
    }
    // relatif (avec ou sans ./)
    const rel = target.startsWith('./') ? target.slice(2) : target;
    const segments = rel.split('/').filter(Boolean);

    for (const seg of segments) {
        if (seg === '..') {
            parts.pop();
        } else if (seg !== '.') {
            parts.push(seg);
        }
    }

    return '/' + parts.join('/');
};
async function getdatafromfile(path) {
    const node = getNode(path);

    if (!node) {
        outputoutput('Fichier introuvable : ' + path);
        return Promise.resolve(null);
    } else if (node.type !== NODE_TYPE.FILE) {
        outputoutput(path + ' : est un répertoire');
        return Promise.resolve(null);
    }

    if (node.Permission === PERMISSION.NONE) {
        outputoutput('Accès non autorisé');
        return Promise.resolve(null);
    }

    if (!node.content) {
        outputoutput(path + ' : aucun contenu');
        return Promise.resolve(null);
    }

    return fetch(node.content)
        .then(r => r.text())
        .then(data => data.split('\n'));
};
function afficherLignes(lignes) {
    if (lignes.length <= PAGER_LIMIT) {
        lignes.forEach(ligne => outputoutput(ligne));
    } else {
        pager(lignes);
    }
};
function afficherLignesRaw(lignes) {
    if (lignes.length <= PAGER_LIMIT) {
        outputoutputraw(lignes.join('\n'));
    } else {
        pagerRaw(lignes);
    }
};
function playCd() {
    const audio = new Audio();
    audio.src = getdatafromfile("/dev/CD.m4a");
    CDAudio.volume = 0.4;
    audio.play();
};
function focus(inputCommandpart) {
    focusActuel = inputCommandpart;
    input.blur();  

    setTimeout(() => {
        if (inputCommandpart === focusCurser.onTerm) {
            input.focus();
        } else if (inputCommandpart === focusCurser.onUserConnect) {
            document.getElementById('passwd')?.focus();
        } else if (inputCommandpart === focusCurser.onManSampaio) {
            document.getElementById('manSampaioInput')?.focus();
        }
    }, 0);
};
function pager(lignes, index = 0, nbLignes = 25) {
    const slice = lignes.slice(index, index + nbLignes);
    slice.forEach(ligne => outputoutput(ligne));

    if (index + nbLignes < lignes.length) {
         focus(focusCurser.onTerm);
        // il reste des lignes
        outputoutputraw("<div class=page>-- Plus -- (Entrée/Espace: continuer</div>");
        session.pager = {
            lignes: lignes,
            index: index + nbLignes,
            nbLignes: nbLignes
        };
        focus(focusCurser.onPager);
    } else {
        // plus rien à afficher → on nettoie et on rend le focus
        outputoutput("-- Fin --");
        input.value = '';
        session.pager = null;
        focus(focusCurser.onTerm);
    }
};
function pagerRaw(lignes, index = 0, nbLignes = 25) {
    const slice = lignes.slice(index, index + nbLignes);
    outputoutputraw(slice.join('\n'));

    if (index + nbLignes < lignes.length) {
        outputoutputraw("<div class=page>-- Plus -- (Entrée/Espace: continuer</div>");
        session.pager = {
            lignes: lignes,
            index: index + nbLignes,
            nbLignes: nbLignes,
            raw: true  
        };
        focus(focusCurser.onPager);
    } else {
        outputoutput("-- Fin --");
        session.pager = null;
        focus(focusCurser.onTerm);
    }
}
function interfacesampaio() {
    const modal = document.getElementById('modalManSampaio');
    modal.classList.add('show');  // Au lieu de remove('hidden')
    
    initTabs();
    initVoirPlus();
    initDocTabs();
    
    // Fermeture
    document.getElementById('closeModal').onclick = function() {
        modal.classList.remove('show');
        focus(focusCurser.onTerm);
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            focus(focusCurser.onTerm);
        }
    };
}
function initTabs() {
  if (tabsInitialized) return;
  tabsInitialized = true;

  const tabButtons = document.querySelectorAll('.tabPrimBtn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const tabPanesPerso = document.querySelectorAll('tab-pane-perso');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.style.display = 'none');
      tabPanesPerso.forEach(pane => pane.style.display = 'none');

      this.classList.add('active');
      const targetPane = document.getElementById('tab-' + tabName);
      if (targetPane) targetPane.style.display = 'block';
    });
  });

  tabPanes.forEach(pane => pane.style.display = 'none');
  const first = document.querySelector('.tabPrimBtn.active');
  if (first) {
    const targetPane = document.getElementById('tab-' + first.dataset.tab);
    if (targetPane) targetPane.style.display = 'block';
  }
};
function initVoirPlus() {
    // Boutons Voir plus
    document.querySelectorAll('.voir-plus-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const parent = this.parentElement;
            const modal = parent.querySelector('.details-modal');

            console.log('parent:', parent);
            console.log('modal:', modal);

            if (modal) {
                modal.classList.add('show');
            }
        });
});

    // Croix de fermeture
    document.querySelectorAll('.close-details').forEach(close => {
        close.onclick = function(e) {
            e.stopPropagation();
            // Trouve le modal parent et enlève la classe
            this.closest('.details-modal').classList.remove('show');
        };
    });
}
function initDocTabs() {
    const docButtons = document.querySelectorAll('.tabSecbtn');
    const docContents = document.querySelectorAll('.doc-content');

    docButtons.forEach(button => {
        button.addEventListener('click', function() {
            const docName = this.getAttribute('data-doc');
            
            // Retire l'état actif de tous les boutons
            docButtons.forEach(btn => btn.classList.remove('active'));
            
            // Cache tous les contenus
            docContents.forEach(content => content.style.display = 'none');
            
            // Active le bouton cliqué
            this.classList.add('active');
            
            // Affiche le contenu correspondant
            const targetDoc = document.getElementById('doc-' + docName);
            if (targetDoc) {
                targetDoc.style.display = 'block';
            }
        });
    });

    // Affiche le premier document par défaut
    docContents.forEach(content => content.style.display = 'none');
    const firstBtn = document.querySelector('.tabSecbtn.active');
    if (firstBtn) {
        const targetDoc = document.getElementById('doc-' + firstBtn.dataset.doc);
        if (targetDoc) targetDoc.style.display = 'block';
    }
};
function setCursorToEnd(element) {
    element.focus();
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // false = à la fin
    selection.removeAllRanges();
    selection.addRange(range);
};
function errchemin(nodeerr, patherr, commerr, typeerr, rais1err, rais2err) {
    if (!patherr) {
        return true;
    } else if (!nodeerr) {
        outputoutput(commerr+ ': ' + patherr + rais1err);
        return true;
    } else if (nodeerr.type === typeerr) {
        outputoutput(commerr + ': ' + patherr + rais2err);
        return true;
    }
    return false;
};