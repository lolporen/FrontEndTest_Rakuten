let id = 0;
let FormStore = function(){
    this.rows = [
        createData('user1', '02-12345678', 'aaa.mail.com', ['Delete', 'Modify'])
    ];
}
FormStore.prototype = {
    getRows(){
        return this.rows
    },
    getUsers(){
        return this.rows.map((object)=>{
            return object.name
        })
    },
    delete(row){
        let index = row.id - 1;
        this.rows.splice(index, 1);
    },
    modify(row){
        let index = row.id - 1;
        this.rows[index] = row;
    },
    add(row){
        this.rows.push(row)
    },
    getAddObject(){
        return createData('', '', '', ['Delete', 'Modify'])
    }
}

function createData(name, phone, email, action) {
    id += 1;
    return { id, name, phone, email, action };
}
export default FormStore