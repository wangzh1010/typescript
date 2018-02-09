let isDone:boolean = false;
let num:number = 123.45;
let str:string = 'abc';
let ary:number[] = [1,2,3]
let ary2:string[] = ['a','b','c'];
let ary3:Array<string> = ['a','b','c'];
// 元组 Tuple
// 表示一个已知元素数量和类型的数组 各元素的类型不必相同
let x: [string, number,string];
x = ['hello',10,'typescript'];
console.log(x[0])
console.log(x[1])
// 枚举 enum
enum Color{Red,Green,Blur}
let c:Color = Color.Red;
console.log(c);
// Any
let noSure:any = 4;
noSure = 'hello';
noSure = true;
let list :any[] = [1,'h','e','l','l','o'];
// Void
function warn():void{
    alert('hello!');
}
// Never
// 类型断言
let str1 :any = 'hello world!';
let len : number = (<string>str1).length;