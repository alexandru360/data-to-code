import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCarouselSlideComponent, Orientation,} from '@ngmodule/material-carousel';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {

  private static readonly INSTALL_TEXT =
    'npm install @ngmodule/material-carousel';

  public slidesList = new Array<never>(5);
  public showContent = false;

  public parentHeight = 'auto';
  public timings = '250ms ease-in';
  public autoplay = true;
  public interval = 5000;
  public loop = true;
  public hideArrows = false;
  public hideIndicators = false;
  public color: ThemePalette = 'accent';
  public maxWidth = 'auto';
  public maintainAspectRatio = true;
  public proportion = 25;
  public slideHeight = '200px';
  public slides = this.slidesList.length;
  public overlayColor = '#00000040';
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public orientation: Orientation = 'ltr';
  public log: string[] = [];

  @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<
    MatCarouselSlideComponent
    >;
  public darkMode = false;

  public get code(): string {
    return `
<div [style.height]="${this.parentHeight}">
  <mat-carousel
    timings="${this.timings}"
    [autoplay]="${this.autoplay}"
    interval="${this.interval}"
    color="${this.color}"
    maxWidth="${this.maxWidth}"
    proportion="${this.proportion}"
    slides="${this.slides}"
    [loop]="${this.loop}"
    [hideArrows]="${this.hideArrows}"
    [hideIndicators]="${this.hideIndicators}"
    [useKeyboard]="${this.useKeyboard}"
    [useMouseWheel]="${this.useMouseWheel}"
    orientation="${this.orientation}"
  >
    <mat-carousel-slide
      #matCarouselSlide
      *ngFor="let slide of slides; let i = index"
      [image]="slide.image"
      overlayColor="${this.overlayColor}"
      [hideOverlay]="${this.hideOverlay}"
    >${this.showContent ? this.innerCode : ''}</mat-carousel-slide>
  </mat-carousel>
</div>
    `;
  }

  private innerCode = `
    <div
      style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center"
    >
      <h1>{{ i }}</h1>
      <p>disabled: {{ matCarouselSlide.disabled }}</p>
      <button
        mat-flat-button
        (click)="matCarouselSlide.disabled = !matCarouselSlide.disabled"
      >
        Click me!
      </button>
    </div>
  `;

  constructor(
    private snackBar: MatSnackBar,
    private overlayContainer: OverlayContainer,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
  }

  public toggleTheme(): void {
    this.darkMode = !this.darkMode;

    const elems = [
      this.elementRef.nativeElement,
      this.overlayContainer.getContainerElement(),
    ];

    for (const elem of elems) {
      if (this.darkMode) {
        elem.classList.add('demo-dark-theme');
        continue;
      }

      elem.classList.remove('demo-dark-theme');
    }
  }

  public copy(): void {
    const textarea = document.createElement('textarea');
    textarea.value = '';
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-99999px';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.snackBar.open('Command was successfully copied to clipboard!', '', {
      duration: 2000,
    });
  }

  public resetSlides(): void {
    this.carouselSlides.forEach((item) => (item.disabled = false));
  }

  public onChange(index: number) {
    this.log.push(`MatCarousel#change emitted with index ${index}`);
  }

}
