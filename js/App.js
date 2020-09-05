if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            console.log('registered',reg);
            
        })
        .catch(Err => {
        console.log(Err+"SW not regsitered");
    })
}

