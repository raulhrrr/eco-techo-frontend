import { Component } from '@angular/core';

interface Image {
  source: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Bienvenido al Sistema de Telemetría del Humedal de Techo Uniagustiniana Proyecto de Proyección Social 2024';
  images: Image[] = [
    this.getImageData('assets/images/carousel/DSC09334.jpeg', 'Sector sur'),
    this.getImageData('assets/images/carousel/DSC09344.jpeg', 'Copetón viajero'),
    this.getImageData('assets/images/carousel/DSC09345.jpeg', 'Lote vecino al occidente'),
    this.getImageData('assets/images/carousel/DSC09349.jpeg', 'Parqueadero vecino'),
    this.getImageData('assets/images/carousel/DSC09351.jpeg', 'Aguas negras arrojadas por casas'),
    this.getImageData('assets/images/carousel/DSC09355.jpeg', 'Casas inmersas en el Humedal'),
    this.getImageData('assets/images/carousel/DSC09359.jpeg', 'Sector norte'),
    this.getImageData('assets/images/carousel/DSC09361.jpeg', 'Lote vecino occidental'),
    this.getImageData('assets/images/carousel/DSC09364.jpeg', 'Parqueadero costado occidental'),
  ];
  description: string = 'El sistema de telemetría del humedal de la Uniagustiniana es un proyecto de proyección social que busca monitorear las condiciones ambientales del humedal para garantizar su conservación y protección mediante el uso del sensor BME680.';

  getImageData(source: string, text: string): Image {
    return { source, alt: text, title: text };
  }
}
