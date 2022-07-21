import React from "react";
import {Table, Button, Form, Modal} from "react-bootstrap";

class Alunos extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            id: 0,
            nome: '',
            nomemae: '',
            rua: '',
            numero: '',
            bairro: '',
            alunos : [],
            modalAberto: false

        }
    }

    componentDidMount(){
        this.buscarAluno();
    }
    componentWillUnmount(){

    }

    buscarAluno = () => {
        fetch("http://localhost:8080/usuarios")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState({alunos : dados})
        })
    }

    deletarAluno = (id) => {
        fetch("http://localhost:8080/usuarios/"+id, {method: 'DELETE'})
        .then(resposta => {
            if(resposta.ok){
                this.buscarAluno();
            }
        })
    }

    carregarDados = (id) => {
        fetch("http://localhost:8080/usuarios/"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(aluno => {
            this.setState({
                id: aluno.id,
                nome: aluno.nome,
                nomemae: aluno.nomemae,
                rua: aluno.rua,
                numero: aluno.numero,
                bairro: aluno.bairro
            })
            this.abrirModal();
        })
    }

    cadastraAluno = (aluno) => {
        fetch("http://localhost:8080/usuarios", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(aluno)     
        })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarAluno();
                }else{
                    alert('Nao foi possivel cadastrar estudante');
            }
        })
    }


    atualizarAluno = (aluno) => {
        fetch("http://localhost:8080/usuarios/", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(aluno)     
        })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarAluno();
                }else{
                    alert('Nao foi possivel atualizar estudante');
            }
        })
    }

    renderTabela(){
        return <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Nome Mae</th>
                    <th>Rua</th>
                    <th>Numero</th>
                    <th>Bairro</th>
                    <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.alunos.map((aluno)=>
                            <tr>
                                <td>{aluno.nome}</td>
                                <td>{aluno.nomemae}</td>
                                <td>{aluno.rua}</td>
                                <td>{aluno.numero}</td>
                                <td>{aluno.bairro}</td>
                                <td>
                                    <Button variant="secondary" onClick={() => this.carregarDados(aluno.id)}>Atualizar</Button>
                                    <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
    }

    atualizarNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )
    }

    atualizarNomeMae = (e) => {
        this.setState(
            {
                nomemae: e.target.value
            }
        )
    }

    atualizarRua = (e) => {
        this.setState(
            {
                rua: e.target.value
            }
        )
    }

    atualizarNumero = (e) => {
        this.setState(
            {
                numero: e.target.value
            }
        )
    }

    atualizarBairro = (e) => {
        this.setState(
            {
                bairro: e.target.value
            }
        )
    }

    submit = () => {

        if(this.state.id === 0){
            const aluno = {
                nome: this.state.nome,
                nomemae: this.state.nomemae,
                rua: this.state.rua,
                numero: this.state.numero,
                bairro: this.state.bairro
            }
            this.cadastraAluno(aluno);
        }else{
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                nomemae: this.state.nomemae,
                rua: this.state.rua,
                numero: this.state.numero,
                bairro: this.state.bairro
            }
            this.atualizarAluno(aluno);
        }
        this.handleClose();
    }

    reset = () => {
        this.setState(
            {
                id: 0,
                nome: '',
                nomemae: '',
                rua: '',
                numero: '',
                bairro: ''
            }
        )
        this.abrirModal();

    }

    handleClose = () =>{
        this.setState(
            {
                modalAberto: false
            }
        )
    }

    abrirModal = () =>{
        this.setState(
            {
                modalAberto: true
            }
        )
    }


    render() {
        return(
            <div>

                <Modal show={this.state.modalAberto} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Dados do Estudante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            {/*<Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={this.state.id} readOnly={true}/>
                            </Form.Group>*/}

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome" value={this.state.nome} onChange={this.atualizarNome}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nome da Mae</Form.Label>
                                <Form.Control type="text" placeholder="Nome da Mãe" value={this.state.nomemae} onChange={this.atualizarNomeMae}/>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Rua</Form.Label>
                                <Form.Control type="text" placeholder="Rua" value={this.state.rua} onChange={this.atualizarRua}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Numero</Form.Label>
                                <Form.Control type="text" placeholder="Numero" value={this.state.numero} onChange={this.atualizarNumero}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control type="text" placeholder="Bairro" value={this.state.bairro} onChange={this.atualizarBairro}/>
                            </Form.Group>

                            

                            
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Fechar
                    </Button>
                    <Button variant="success" type="submit" onClick={this.submit}>
                     Salvar
                    </Button>
                    </Modal.Footer>
                 </Modal>

                <Button variant="primary" type="submit" onClick={this.reset}>
                    Novo Cadastro
                </Button>
                

                {this.renderTabela()}
            </div>
        )
    }

}
export default Alunos;