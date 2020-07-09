import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html'
})
export class LogComponent implements OnInit {

  buenactm: string = 'Por favor Sign In!';
  usuario: Usuario;



  constructor( private auth : AuthService, private router: Router) {
  this.usuario = new Usuario();
}

  ngOnInit() {
  }

  log(){
    debugger;
    this.auth.login(this.usuario).subscribe(response => {
      console.log(response);

      this.auth.guardarUsuario(response.access_token);
      this.auth.guardarToken(response.access_token);
      let usuario = this.auth.usuario;
      this.router.navigate(['/clientes']);
      swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
     }, err => {
      if (err.status == 400) {
        swal('Error Login', 'Usuario o clave incorrectas!', 'error');
       }
    }
    );
    }

}
