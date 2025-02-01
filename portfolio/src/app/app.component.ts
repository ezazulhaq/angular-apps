import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HeroComponent } from "./hero/hero.component";
import { AboutComponent } from "./about/about.component";
import { FactsComponent } from "./facts/facts.component";
import { SkillsComponent } from "./skills/skills.component";
import { ResumeComponent } from "./resume/resume.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ServicesComponent } from "./services/services.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        HeroComponent,
        AboutComponent,
        SkillsComponent,
        ResumeComponent,
        ContactComponent,
        FooterComponent
    ]
})
export class AppComponent {

}
