const app = require('./src/app');

const PORT = process.env.PORT || 3007;

const server = app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})

// method quy trinh trong node js -> nếu ctrl c server sẽ auto đóng lại và có thông báo
process.on('SIGINT', ()=>{
    server.close( ()=>{
        console.log('Exit Server express')
    } )
} )