import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mondongo',
  templateUrl: './mondongo.component.html',
  styleUrl: './mondongo.component.css'
})
export class MondongoComponent {
  //Cosa que coge al monigote
  @ViewChild('mondongo', {static: true}) mondongoRef!: ElementRef;

  constructor() { }

  /**
   * Si lo pongo en el constructor muere todo
   */
  ngOnInit(): void {
    this.animateMondongo();
  }

  /**
   * Funcion que reproduce el audio al pulsar en el monigote
   */
  reproducirAudio(): void {
    const audio = document.getElementById('audiomondongo') as HTMLAudioElement;
    audio.currentTime = 0; // Reiniciar el audio si ya estaba reproduciéndose
    audio.play();
  }

  /**
   * Funcion que anima al monigote
   */
  animateMondongo(): void {
    const mondongo = this.mondongoRef.nativeElement;
    let x = 0;
    let y = 0;
    let deltaX = 1; 
    let deltaY = 1; 

    setInterval(() => {
      // Cambiar la posición
      x += deltaX;
      y += deltaY;

      // Aplicar la nueva posición
      mondongo.style.left = x + 'px';
      mondongo.style.top = y + 'px';

      // Cambiar la dirección cuando el mondongo alcanza los bordes de la ventana
      if (x <= 0 || x >= window.innerWidth - mondongo.offsetWidth) {
        deltaX *= -1; 
      }
      if (y <= 0 || y >= window.innerHeight - mondongo.offsetHeight) {
        deltaY *= -1; 
      }
    }, 5); // Intervalo de tiempo para el movimiento
  }

}

