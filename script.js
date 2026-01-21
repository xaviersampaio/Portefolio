
const Filesystem = {
    '/': {
        type: 'dir',
        children: ['home', 'etc', 'var']
    },
    '/home': {
        type:'dir',
        children: ['user', 'root', 'xavier']
    },
    '/home/user': {
        type:'dir',
        children:['portfolio', 'lab']
    },
    '/home/root':{
        type:'dir',
        children: []
    },
    '/home/xavier':{
        type:'dir',
        children: []
    },
    '/etc': {
        type:'dir',
        children:['fstab', 'cron.d', 'apt']
    },
    '/etc/fstab': {
        type:'file',
        content:'Inserer du contenu'
    },
    '/etc/cron.d': {
        type:'file',
        content:'Outils d\'automatisation de tache'
    },
    '/etc/apt': {
        type:'file',
        children:['source.list', 'Source.list.d']
    },
    '/var': {
        type:'dir',
        children:['opt']
    },
    '/var/opt': {
        type:'dir',
        children:['www']
    },
    '/var/opt/www': {
        typr:'dir',
        children:[]
    }
};

const tabCommand = ['help', 'pwd', 'cat','su','ls','cd','timedatctl','clear','exit','ollama'];

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
    ollama: (args) => console.log("OLLAMA", args),
    
};
// variable
let input = document.getElementById('inputid');
let submit = document.getElementById('submitBtn');
let session = { currentUser : 'user'};
let located = '/home';

// Gestion Document && initialisation de la page 
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
}});
    //fonction historique
    //a faire


//fonction Commande
function help(args) { 
    outputoutput("=============");
    outputoutput("||Help menu||");
    outputoutput("=============");
    outputoutput("- help");
    outputoutput("       | Open this menu");
    outputoutput("- pwd");
    outputoutput("       | Print Working Directory");
    outputoutput("- cat");
    outputoutput("       | Concatenate file");
    outputoutput("- ls");
    outputoutput("       | Display the content of directories");
    outputoutput("- cd");
    outputoutput("       | Change Directory");
    outputoutput("- clear");
    outputoutput("       | Clear terminal script");
    outputoutput("- su");
    outputoutput("       | Change User");
    outputoutput("       | update after 2 enter ");
    outputoutput("       | root unallowed");
    outputoutput("- exit");
    outputoutput("       | Exit connexion");
    outputoutput("       | not recommend");
    outputoutput("- su");
    outputoutput("       | Change User");
    outputoutput("       | root unallowed");
    outputoutput("- timedatctl");
    outputoutput("       | Show Time and Date ");
    outputoutput("       | on dev");
    outputoutput("- ollama");
    outputoutput("       | Chatbot see /etc/ollama");
    outputoutput("       | on dev");
    outputoutput("       | can be monitored by me");
    //outputoutput(" ");
    //outputoutput("===============");
    //outputoutput("||Prefix menu||");
    //outputoutput("===============");
    //outputoutput(" ");
    //outputoutput("Prefix is not supported at the moment");
    //outputoutput(" ");


    };
function pwd(inputCommandpart) {
    outputoutput(located);
};
function cat(inputCommandpart) {
    if (inputCommandpart.length === 1 ){
        if (Filesystem[inputCommandpart].type === "file") {
        };
    }else {
        outputoutput("la concaténation est en développement")
    }
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
    inputCommandpart = chemin(inputCommandpart);
    
    if (inputCommandpart === undefined) {
        return 0
    } else if (Filesystem[inputCommandpart]) {
        located = inputCommandpart
    } else {
        console.log("raté");
    }
};
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

function timedatctl(inputCommandpart) {};

function ollama(inputCommandpart) {};

//fonction systeme
function outputinput(inputCommand) { // retourne le prefix commandes [user]@[location]$[command]
    let output = document.getElementById('outputid');
    let newLine = document.createElement('div');
    let prefixecomm = session.currentUser+'@' + located + "$"
    document.getElementById('prefix').textContent = prefixecomm
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
}
function chemin(inputCommandpart){ //resous le chemin de l'utilisateur quand il a (ex: ls, cd)
    //located chemin actuel input command part chemin a tester
    if (inputCommandpart.length === 0 ) { //test si il y a aucun parametre 
        inputCommandpart = located;
        }
    else if (inputCommandpart[0].startsWith(".")) { // test si c'est le chemin n'est pas entier
        if (inputCommandpart[0].slice(2) === "./"){  // si l'utilisateur fait ls ./
            inputCommandpart = located;
        } else {
            console.log(inputCommandpart[0].startsWith("/")); //renvoie true
            inputCommandpart = located + inputCommandpart[0].slice(2); // construction du chemin
            console.log(inputCommandpart)
        };        
    }
    else if (inputCommandpart[0].startsWith("/")) { //test si c'est le chemin est entier
        console.log(inputCommandpart[0].startsWith("/"));
        inputCommandpart = inputCommandpart[0];
    };
    return(inputCommandpart); 
};

