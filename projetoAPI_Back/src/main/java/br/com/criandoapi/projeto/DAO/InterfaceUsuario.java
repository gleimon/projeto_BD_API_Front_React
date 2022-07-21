package br.com.criandoapi.projeto.DAO;

import org.springframework.data.repository.CrudRepository;

import br.com.criandoapi.projeto.model.Usuario;

public interface InterfaceUsuario extends CrudRepository<Usuario, Integer>{

}
