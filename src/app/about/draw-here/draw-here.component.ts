import { Component, OnInit, ElementRef } from 'angular2/core'

import { GetOffsetFromPage } from './getOffsetFromPage'

@Component({
  moduleId: module.id,
  selector: 'draw-here',
  template: require('./draw-here.component.html'),
  styles: [
`:host { width: 100%; position: relative; margin: 1em auto; display: block; }
canvas { -webkit-user-select: none; border: 1px solid goldenrod; width: 720px; height: 480px; margin: 1em auto; display: block; }`
  ],
})
export class DrawHereComponent implements OnInit {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private isDrawing: boolean
  private offsetLeft: number
  private offsetTop: number
  constructor(private el: ElementRef) {
  }
  ngOnInit() {
    this.canvas = (this.el.nativeElement as HTMLDivElement).childNodes[0] as HTMLCanvasElement
    this.canvas.width = 720
    this.canvas.height = 480
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
    console.log(this.ctx)
    let offs = GetOffsetFromPage(this.canvas)
    this.offsetLeft = offs.left
    this.offsetTop = offs.top
    this.canvas.addEventListener('mousemove', (event) => {
      if (this.isDrawing) {
        let x = event.clientX - window.scrollX - this.offsetLeft
        let y = event.clientY - window.scrollY - this.offsetTop
        // this.ctx.fillRect(x, y, 5, 5)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
      }
    })
    this.canvas.addEventListener('mousedown', () => {
      this.isDrawing = true
      let ctx = this.ctx
      ctx.beginPath()

      let linGradientX2 = 720 * Math.random()
      let linGradientY2 = 480 * Math.random()

      var gradient = ctx.createLinearGradient(0,0,linGradientX2 + 720,linGradientY2 + 480);
      gradient.addColorStop(0, this.getRandomColor())
      gradient.addColorStop(.5, this.getRandomColor())
      gradient.addColorStop(1.0, this.getRandomColor())

      // Fill with gradient
      ctx.strokeStyle = gradient
      this.ctx.lineWidth = Math.abs(50 * Math.sin(Date.now() * 0.005)) + 25
    })
    this.canvas.addEventListener('mouseup', () => {
      this.isDrawing = false
      this.ctx.closePath()
    })
    this.canvas.addEventListener('mouseleave', () => {
      this.isDrawing = false
      this.ctx.closePath()
    })
    this.canvas.addEventListener('doubleclick', () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    })
  }

  private getRandomColor(): string {
    return "#" + Math.floor(Math.random() * 0xEFFFFF + 0x100000).toString(16)
  }
}
