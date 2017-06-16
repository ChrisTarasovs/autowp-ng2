@Directive({
  selector: '[runDummyFunc]'
})
export class runDummyFunc {

  constructor() {}
  ngOnInit() {      
     this.runDummyFunc()
  } 

}