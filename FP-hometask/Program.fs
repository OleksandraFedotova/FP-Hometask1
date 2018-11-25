// Learn more about F# at http://fsharp.org

open System
open System.Drawing

type Order(name: string, price: double, date: DateTime) = 
    member this.name = name
    member this.price = price
    member this.date = date  ;


let ordersList : Order list =
[
new Order("TV",300.0, new DateTime(2018,10,10));
new Order("laptop",600.0,new DateTime(2018,10,12));
new Order("PC",800.0,new DateTime(2018,9,5));
new Order("owen",300.0,new DateTime());
new Order("Camera",500.0,new DateTime(2018,3,3));
new Order("Fridge",1000.0,new DateTime(2018,12,11));
new Order("table",150.0,new DateTime(2018,12,10));
new Order("Sofa",400.0,new DateTime(2018,12,8));
new Order("chair",0.0,new DateTime(2018,9,10));
new Order("Window",300.0,new DateTime(2018,5,5));
];;


