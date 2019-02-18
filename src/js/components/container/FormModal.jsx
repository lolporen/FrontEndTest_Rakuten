import React, { Component } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
let parentFormStore = '';

class FormModal extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        open: false,
        row:{ 
            id:'',
            name:'',
            phone:'', 
            email:'', 
            action:''
        },
        modalType: '',
        emailError: false,
        userError: false
      };
    }
    render(){
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby='responsive-dialog-title'
            >
            <DialogContent>
                <TextField
                autoFocus
                error={this.state.userError}
                margin="dense"
                id="Name"
                label="Name"
                value={this.state.row.name}
                onChange={this.handleChange('name')}
                fullWidth
                />
                <TextField
                margin="dense"
                id="Phone"
                label="Phone"
                value={this.state.row.phone}
                onChange={this.handleChange('phone')}
                fullWidth
                />
                <TextField
                required
                error={this.state.emailError}
                margin="dense"
                id="Email"
                label="Email"
                value={this.state.row.email}
                onChange={this.handleChange('email')}
                type="email"
                fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleSave.bind(this)} color="primary" autoFocus>
                保存
                </Button>
                <Button onClick={this.handleClose.bind(this)} color="primary">
                取消
                </Button>
            </DialogActions>
            </Dialog>
        );
    }
    changeParent(){
        this.props.parent.setState({});
    }
    handleClose(){
        this.setState({ 
            open: false,
            emailError: false,
            userError: false
        });
    }
    handleSave(){
        let isUserNmae = this.state.modalType==='modify' ? false : this.props.users.includes(this.state.row['name']);
        let isEmailAddress = this.state.row['email'] ? false : validateEmail(this.state.row['email']);
        if(isEmailAddress && !isUserNmae){
            this.state.modalType === 'modify' ? parentFormStore.modify(this.state.row) : false;
            this.state.modalType === 'add' ? parentFormStore.add(this.state.row) : false;
            this.handleClose();
            this.changeParent();
        }else{
            this.setState({
                emailError: !isEmailAddress,
                userError: isUserNmae
            })
        }
    }
    handleChange(name){
        return (event) => {
            this.state.row[name] = event.target.value;
            this.setState({ row: this.state.row });
        }
    };
    handleClickOpen(type, row, formStore){
        parentFormStore = formStore;
        this.setState({ 
            open: true,
            modalType: type,
            row: row
        });
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export default FormModal