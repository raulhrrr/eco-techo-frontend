import { Component, OnInit } from '@angular/core';

interface Image {
  source: string;
  alt: string;
  title?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Bienvenido al Sistema de Telemetría del Humedal de Techo Uniagustiniana Proyecto de Proyección Social 2024';
  images: Image[] = [];
  video = 'assets/videos/VID_01.mp4';
  description = 'El Humedal de Techo representa un ecosistema vital para la comunidad de Santa Catalina, desempeñando un papel crucial en la regulación del clima local, la preservación de la biodiversidad y el suministro de servicios ambientales esenciales. Sin embargo, el crecimiento urbano y el impacto humano han puesto en riesgo su integridad. En respuesta a esta problemática, el Sistema de Telemetría del Humedal de Techo surge como una iniciativa para monitorear en tiempo real el estado del humedal, utilizando tecnologías avanzadas como sensores, ciencia de datos e inteligencia artificial.';
  general_objective = 'Difundir y concientizar el estado actual del humedal de Techo entre los residentes de la comunidad de Santa Catalina para que propendan con el cuidado de este utilizando diferentes sensores, la ciencia de datos, la inteligencia artificial y los sistemas de monitoreo ambiental en tiempo real en pro para la conservación de las áreas del humedal de techo.';
  specific_objectives = [
    'Analizar por medio de un sistema de telemetría el estado del humedal de Techo, utilizando sensores, la ciencia de datos y la inteligencia artificial en pro para la conservación de las áreas del humedal.',
    'Socializar la importancia y cuidado pertinente del Humedal de Techo con la comunidad de Santa Catalina.'
  ];

  ngOnInit() {
    for(let i = 1; i <= 34; i++) {
      const imageIndex = i < 10 ? '0' + i : i;
      this.images.push({
        source: `assets/images/carousel/IMG_${imageIndex}.jpeg`,
        alt: `Imagen ${imageIndex}`
      });
    }
  }

  getImageData(source: string, text: string): Image {
    return { source, alt: text, title: text };
  }
}
