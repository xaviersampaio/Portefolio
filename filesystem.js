export const Filesystem = {
    '/': {
        type: 'dir',
        children: ['bin', 'dev', 'etc', 'home', 'var'],
        autorised: 1
    },
    '/bin': {
        type: 'dir',
        children: ['help', 'man','pwd', 'cat', 'su', 'ls', 'cd', 'timedatctl', 'ollama', 'exit'],
        autorised: 1
    },
    '/bin/help': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/bin/man': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/bin/pwd': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/bin/cat': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/bin/su': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/bin/ls': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/bin/cd': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/bin/timedatctl': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/bin/ollama': {
        type:'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev': {
        type: 'dir',
        children: ['block', 'cdrom', 'console', 'disk', 'null', 'nvram', 'random', 'sda', 'sda1', 'sda2', 'sda3', 'tty', 'urandom'],
        autorised: 1
    },
    '/dev/block': {
        type: 'dir',
        children: [],
        autorised: 1
    },
    '/dev/cdrom': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/console': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/disk': {
        type: 'dir',
        children: ['by-diskeq','by-id','by-label','by-partuuid','by-path','by-uud'],
        autorised: 1
    },
    '/dev/disk/by-diskeq': {
        type: 'dir',
        children: [],
        autorised: 1
    },
    '/dev/disk/by-id': {
        type: 'dir',
        children: [],
        autorised: 1
    },
    '/dev/disk/by-label': {
        type: 'dir',
        children: [],
        autorised: 1
    },
    '/dev/disk/by-partuuid': {
        type: 'dir',
        children: [],
        autorised: 1
    },
    '/dev/disk/by-path': {
        type: 'dir',
        children: [],
        autorised: 1
    },
    '/dev/disk/by-uud': {
        type: 'dir',
        children: [],
        autorised: 1
    },
    '/dev/null': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/nvram': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/random': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/sda': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/sda1': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/sda2': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/sda3': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/tty': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/dev/urandom': {
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/etc': {
        type: 'dir',
        children: ['crontab','fstab','hostname','local.conf','nanorc','network','os-release','ssh','ssl','systemd','timezone','vim'],
        autorised: 1
    },
    '/etc/crontab': {
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/fstab': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1
    },
    '/etc/hostname': { 
        type: 'file', 
        content: [' bleu '], autorised: 1 
    },
    '/etc/local.conf': { 
        type: 'file',
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/nanorc': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/network': {
        type: 'dir',
        children: ['if-down.d','if-post-down.d','if-pre-up.d','if-up.d','interfaces','interfaces.d'],
        autorised: 1
    },
    '/etc/network/if-down.d': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/network/if-post-down.d': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/network/if-pre-up.d': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/network/if-up.d': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/network/interfaces': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/network/interfaces.d': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/os-release': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/ssh': {
        type: 'dir',
        children: ['ssh_config','ssh_config.d'],
        autorised: 1
    },
    '/etc/ssh/ssh_config': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/ssh/ssh_config.d': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/ssl': {
        type: 'dir',
        children: ['certs','openssl.cnf','private'],
        autorised: 1
    },
    '/etc/ssl/certs': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/ssl/openssl.cnf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/ssl/private': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/systemd': {
        type: 'dir',
        children: ['journald.conf','logind.conf','network','networkd.conf','pstore.conf','sleep.conf','system','system.conf','timesyncd.conf','user','user.conf'],
        autorised: 1
    },
    '/etc/systemd/journald.conf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 },
    '/etc/systemd/logind.conf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/systemd/network': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/systemd/networkd.conf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/systemd/pstore.conf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/systemd/sleep.conf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/systemd/system': {
         type: 'dir', 
         children: [], 
         autorised: 1 
    },
    '/etc/systemd/system.conf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/systemd/timesyncd.conf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },

    '/etc/systemd/user': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/etc/systemd/user.conf': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/timezone': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/vim': {
        type: 'dir',
        children: ['vimrc','vimrc.tiny'],
        autorised: 1
    },
    '/etc/vim/vimrc': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/etc/vim/vimrc.tiny': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1
    },
    '/home': {
        type: 'dir',
        children: ['user','root'],
        autorised: 1
    },
    '/home/user': {
        type: 'dir',
        children: ['portfolio','lab'],
        autorised: 1
    },
    '/home/user/portfolio': {
        type: 'dir',
        children: ['media','filesystem.js','index.html','style.css','script.js'],
        autorised: 1
    },
    '/home/user/portfolio/media': {
        type: 'dir',
        children: ['competence','rapportDeStage2'],
        autorised: 1
    },
    '/home/user/portfolio/media/competence': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/home/user/portfolio/media/rapportDeStage2': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/home/user/portfolio/filesystem.js': {
        type: 'file',
        content: ['bleu'],
        autorised: 1
    },
    '/home/user/portfolio/index.html': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/portfolio/style.css': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/portfolio/script.js': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab': {
        type: 'dir',
        children: ['projetDevPerso','projetInfraPerso','projetRag'],
        autorised: 1
    },
    '/home/user/lab/projetDevPerso': {
        type: 'dir',
        children: ['portfolio','zengarden'],
        autorised: 1
    },
    '/home/user/lab/projetDevPerso/portfolio': {
        type: 'dir',
        children: ['lsportfolio','.gitgnore','notesDuProjet','index.html','input.css','readme.md','script.js','style.css','tailwind.config.js'],
        autorised: 1
    },
    '/home/user/lab/projetDevPerso/portfolio/lsportfolio': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/portfolio/.gitgnore': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/portfolio/notesDuProjet': {
         type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/portfolio/index.html': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/portfolio/input.css': { 
        type: 'file', 
        content: [' bleu '],
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/portfolio/readme.md': {
        type: 'file', 
        content: [' bleu '],
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/portfolio/script.js': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/portfolio/style.css': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/portfolio/tailwind.config.js': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1
     },
    '/home/user/lab/projetDevPerso/zengarden': {
        type: 'dir',
        children: ['icon','media','index.html','style.css','notesDuProjet','lszengarden'],
        autorised: 1
    },
    '/home/user/lab/projetDevPerso/zengarden/icon': {
        type: 'dir',
        children: ['accessibility.png','creative-common.png','css.png','github.png','HTML.png'],
        autorised: 1
    },
    '/home/user/lab/projetDevPerso/zengarden/icon/accessibility.png': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1
    },
    '/home/user/lab/projetDevPerso/zengarden/icon/creative-common.png': { 
        type: 'file',
         content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/icon/css.png': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/icon/github.png': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1
     },
    '/home/user/lab/projetDevPerso/zengarden/icon/HTML.png': {
         type: 'file', 
         content: [' bleu '], 
         autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media': {
        type: 'dir',
        children: ['automne.gif','automne.png','automne2.png','backgroud.jpg','ete.gif','ete.png','footer.png','hiver.gif','hiver.png','printemps.png','printemps.gif'],
        autorised: 1
    },
    '/home/user/lab/projetDevPerso/zengarden/media/automne.gif': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/automne.png': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/automne2.png': { 
        type: 'file',
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/backgroud.jpg': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1
    },
    '/home/user/lab/projetDevPerso/zengarden/media/ete.gif': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/ete.png': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/footer.png': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/hiver.gif': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/hiver.png': { 
        type: 'file',
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/media/printemps.png': { 
        type: 'file',
        content: [' bleu '],
        autorised: 1
    },
    '/home/user/lab/projetDevPerso/zengarden/media/printemps.gif': { 
        type: 'file',
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/index.html': {
        type: 'file', 
        content: [' bleu '],
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/style.css': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/notesDuProjet': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetDevPerso/zengarden/lszengarden': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetInfraPerso': {
        type: 'dir',
        children: ['imgLab','serviceDeploye'],
        autorised: 1
    },
    '/home/user/lab/projetInfraPerso/imgLab': {
         type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/home/user/lab/projetInfraPerso/serviceDeploye': { 
        type: 'dir', 
        children: [], 
        autorised: 1 
    },
    '/home/user/lab/projetRag': {
        type: 'dir',
        children: ['docker-compose.yml','.env','notesDuProjet','lschatbot'],
        autorised: 1
    },
    '/home/user/lab/projetRag/docker-compose.yml': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1
    },
    '/home/user/lab/projetRag/.env': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 0
    },
    '/home/user/lab/projetRag/notesDuProjet': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/user/lab/projetRag/lschatbot': { 
        type: 'file', 
        content: [' bleu '], 
        autorised: 1 
    },
    '/home/root': {
        type: 'dir',
        children: [],
        autorised: 0
    },
    '/var': {
        type: 'dir',
        children: ['opt'],
        autorised: 1
    },
    '/var/opt': {
        type: 'dir',
        children: ['www'],
        autorised: 1
    },
    '/var/opt/www': {
        type: 'dir',
        children: [],
        autorised: 1
    }
};
