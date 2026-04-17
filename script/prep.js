const now = new Date();
            const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
        };
        
        const dateStr = now.toLocaleString('fr-FR', options);
        document.getElementById('sysinfo').textContent = `Informations système au ${dateStr}`;
