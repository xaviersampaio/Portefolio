export const PERMISSION = { // gestion des permissions plus lisible
	NONE: 0,
	READ_ONLY: 1,
	READ_WRITE: 2,
	ROOT_ONLY: 3,
};

export const NODE_TYPE = { // gestion des types plus lisible
	DIR: 'dir',
	FILE: 'file',
};

export const Filesystem = {
    '/': {
        type: NODE_TYPE.DIR,
        children: ['bin', 'dev', 'etc', 'home', 'var'],
        autorised: PERMISSION.READ_ONLY
    },
    '/bin': {
        type: NODE_TYPE.DIR,
        children: ['help', 'man','pwd', 'cat', 'su', 'ls', 'cd', 'timedatctl', 'ollama', 'exit'],
        autorised: PERMISSION.READ_ONLY
    },
    '/bin/help': {
        type: NODE_TYPE.FILE,
        content: ['/Portefolio/data/racine/bin/help'],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/man': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/pwd': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/cat': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/su': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/su': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/sl': {
        type: NODE_TYPE.FILE,
        content: ['/Portefolio/data/racine/bin/sl'],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/cd': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/timedatctl': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/ollama': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/exit': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/echo': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/bin/vim': {
        type: NODE_TYPE.FILE,
        content: [' bleu '],
        autorised: PERMISSION.READ_WRITE
    },
    '/dev': {
        type: NODE_TYPE.DIR,
        children: ['block', 'cdrom', 'console', 'disk', 'null', 'nvram', 'random', 'sda', 'sda1', 'sda2', 'sda3', 'tty', 'urandom'],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/block': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/cdrom': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/console': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/disk': {
        type: NODE_TYPE.DIR,
        children: ['by-diskeq','by-id','by-label','by-partuuid','by-path','by-uud'],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/disk/by-diskeq': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/disk/by-id': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/disk/by-label': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/disk/by-partuuid': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/disk/by-path': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/disk/by-uud': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/null': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/nvram': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/random': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/sda': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/sda1': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/sda2': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/sda3': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/tty': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/dev/urandom': {
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY
    },
    '/etc': {
        type: NODE_TYPE.DIR,
        children: ['crontab','fstab','hostname','local.conf','nanorc','network','os-release','ssh','ssl','systemd','timezone','vim'],
        autorised: PERMISSION.READ_WRITE
    },
    '/etc/crontab': {
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/fstab': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY
    },
    '/etc/hostname': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
		autorised: PERMISSION.READ_WRITE 
    },
    '/etc/local.conf': { 
        type: 'NODE_TYPE.FILE',
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/nanorc': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/network': {
        type: NODE_TYPE.DIR,
        children: ['if-down.d','if-post-down.d','if-pre-up.d','if-up.d','interfaces','interfaces.d'],
        autorised: PERMISSION.READ_ONLY
    },
    '/etc/network/if-down.d': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/network/if-post-down.d': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/network/if-pre-up.d': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/network/if-up.d': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/network/interfaces': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/network/interfaces.d': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/os-release': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/ssh': {
        type: NODE_TYPE.DIR,
        children: ['ssh_config','ssh_config.d'],
        autorised: PERMISSION.READ_ONLY
    },
    '/etc/ssh/ssh_config': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY
    },
    '/etc/ssh/ssh_config.d': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/ssl': {
        type: NODE_TYPE.DIR,
        children: ['certs','openssl.cnf','private'],
        autorised: PERMISSION.ROOT_ONLY
    },
    '/etc/ssl/certs': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/ssl/openssl.cnf': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/ssl/private': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/systemd': {
        type: NODE_TYPE.DIR,
        children: ['journald.conf','logind.conf','network','networkd.conf','pstore.conf','sleep.conf','system','system.conf','timesyncd.conf','user','user.conf'],
        autorised: PERMISSION.READ_ONLY
    },
    '/etc/systemd/journald.conf': { 
        type: 'NODE_TYPE.FILE', 
        content: [], 
        autorised: PERMISSION.ROOT_ONLY 
	},
    '/etc/systemd/logind.conf': { 
        type: 'NODE_TYPE.FILE', 
        content: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/systemd/network': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/systemd/networkd.conf': { 
        type: 'NODE_TYPE.FILE', 
        content: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/systemd/pstore.conf': { 
        type: 'NODE_TYPE.FILE', 
        content: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/systemd/sleep.conf': { 
        type: 'NODE_TYPE.FILE', 
        content: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/systemd/system': {
         type: NODE_TYPE.DIR, 
         children: [], 
         autorised: PERMISSION.ROOT_ONLY
    },
    '/etc/systemd/system.conf': { 
        type: 'NODE_TYPE.FILE', 
        content: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/systemd/timesyncd.conf': { 
        type: 'NODE_TYPE.FILE', 
        content: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },

    '/etc/systemd/user': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/systemd/user.conf': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.ROOT_ONLY 
    },
    '/etc/timezone': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/etc/vim': {
        type: NODE_TYPE.DIR,
        children: ['vimrc','vimrc.tiny'],
        autorised: PERMISSION.ROOT_ONLY
    },
    '/etc/vim/vimrc': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.ROOT_ONLY
    },
    '/etc/vim/vimrc.tiny': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.ROOT_ONLY
    },
    '/home': {
        type: NODE_TYPE.DIR,
        children: ['user','root'],
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user': {
        type: NODE_TYPE.DIR,
        children: ['portfolio','lab'],
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/portfolio': {
        type: NODE_TYPE.DIR,
        children: ['media','filesystem.js','index.html','style.css','script.js'],
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/portfolio/media': {
        type: NODE_TYPE.DIR,
        children: ['competence','rapportDeStage2'],
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/portfolio/media/competence': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/portfolio/media/rapportDeStage2': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/portfolio/filesystem.js': {
        type: 'NODE_TYPE.FILE',
        content: ['bleu'],
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/portfolio/index.html': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/portfolio/style.css': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/portfolio/script.js': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab': {
        type: NODE_TYPE.DIR,
        children: ['projetDevPerso','projetInfraPerso','projetRag'],
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/lab/projetDevPerso': {
        type: NODE_TYPE.DIR,
        children: ['portfolio','zengarden'],
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/lab/projetDevPerso/portfolio': {
        type: NODE_TYPE.DIR,
        children: ['lsportfolio','.gitgnore','notesDuProjet','index.html','input.css','readme.md','script.js','style.css','tailwind.config.js'],
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/lab/projetDevPerso/portfolio/lsportfolio': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY
    },
    '/home/user/lab/projetDevPerso/portfolio/.gitgnore': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/portfolio/notesDuProjet': {
         type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/portfolio/index.html': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/portfolio/input.css': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/portfolio/readme.md': {
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/portfolio/script.js': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/portfolio/style.css': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/portfolio/tailwind.config.js': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
     },
    '/home/user/lab/projetDevPerso/zengarden': {
        type: NODE_TYPE.DIR,
        children: ['icon','media','index.html','style.css','notesDuProjet','lszengarden'],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/icon': {
        type: NODE_TYPE.DIR,
        children: ['accessibility.png','creative-common.png','css.png','github.png','HTML.png'],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/icon/accessibility.png': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/icon/creative-common.png': { 
        type: 'NODE_TYPE.FILE',
         content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/icon/css.png': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/icon/github.png': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
     },
    '/home/user/lab/projetDevPerso/zengarden/icon/HTML.png': {
         type: 'NODE_TYPE.FILE', 
         content: [' bleu '], 
         autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media': {
        type: NODE_TYPE.DIR,
        children: ['automne.gif','automne.png','automne2.png','backgroud.jpg','ete.gif','ete.png','footer.png','hiver.gif','hiver.png','printemps.png','printemps.gif'],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/automne.gif': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/automne.png': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/automne2.png': { 
        type: 'NODE_TYPE.FILE',
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/backgroud.jpg': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/ete.gif': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/ete.png': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/footer.png': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/hiver.gif': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/hiver.png': { 
        type: 'NODE_TYPE.FILE',
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY  
    },
    '/home/user/lab/projetDevPerso/zengarden/media/printemps.png': { 
        type: 'NODE_TYPE.FILE',
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/printemps.gif': { 
        type: 'NODE_TYPE.FILE',
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/index.html': {
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/style.css': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/notesDuProjet': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetDevPerso/zengarden/lszengarden': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY  
    },
    '/home/user/lab/projetInfraPerso': {
        type: NODE_TYPE.DIR,
        children: ['imgLab','serviceDeploye'],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetInfraPerso/imgLab': {
         type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY  
    },
    '/home/user/lab/projetInfraPerso/serviceDeploye': { 
        type: NODE_TYPE.DIR, 
        children: [], 
        autorised: PERMISSION.READ_ONLY  
    },
    '/home/user/lab/projetRag': {
        type: NODE_TYPE.DIR,
        children: ['docker-compose.yml','.env','notesDuProjet','lschatbot'],
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetRag/docker-compose.yml': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetRag/.env': { 
        type: 'NODE_TYPE.FILE',   
        content: [' bleu '], 
        autorised: PERMISSION.ROOT_ONLY
    },
    '/home/user/lab/projetRag/notesDuProjet': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/user/lab/projetRag/lschatbot': { 
        type: 'NODE_TYPE.FILE', 
        content: [' bleu '], 
        autorised: PERMISSION.READ_ONLY 
    },
    '/home/root': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY 
    },
    '/var': {
        type: NODE_TYPE.DIR,
        children: ['opt'],
        autorised: PERMISSION.READ_ONLY 
    },
    '/var/opt': {
        type: NODE_TYPE.DIR,
        children: ['www'],
        autorised: PERMISSION.READ_ONLY 
    },
    '/var/opt/www': {
        type: NODE_TYPE.DIR,
        children: [],
        autorised: PERMISSION.READ_ONLY 
    }
};
