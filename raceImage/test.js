class Test {
    constructor(str) {
      this.str = str;
    }
  
    func() {
      console.log("hello");
      return "test";
    };
  
    func2() {
      console.log("before");
      let result = this.func();
      console.log("after");
      return result;
    };
  }
  
  var a = new Test("nothing");
  let res = a.func2();
  console.log(res);