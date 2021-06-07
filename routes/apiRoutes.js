const fs = require('fs');

let noteList;

fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    noteList = JSON.parse(data);
    
    //console.log(noteList);
});

module.exports = (app) => {
    app.get('/api/notes', (req,res) => res.json(noteList));


    app.get('/api/notes/:id', (req,res) => res.send(req.params));

    
    app.post('/api/notes', (req,res) =>{
        console.log(typeof req.body);
        
        console.log(req.body.title);
        const newNote = {
            id: noteList.length++,
            title: req.body.title,
            text: req.body.text
        }
        noteList.push(newNote);
        console.log(noteList);
        
        fs.writeFile('./db/db.json', JSON.stringify(noteList), err =>{
            if (err){
                console.error(err);
                return
            }
        })
        
    });
    
};

