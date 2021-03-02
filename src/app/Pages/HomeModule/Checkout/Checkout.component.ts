import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Allorder } from 'src/app/Models/Allorder';
import { FoodOrder } from 'src/app/Models/FoodOrder';
import { FoodOrderDto } from 'src/app/Models/FoodOrderDto';
import { OrderService } from 'src/app/_service/Order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Checkout',
  templateUrl: './Checkout.component.html',
  styleUrls: ['./Checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart:FoodOrderDto={}as FoodOrderDto;
  decodedToken:any;
  restaurantname:any
  address:any;
  rstimg:any;
  jwtHelper = new JwtHelperService();
  allorder:Allorder={}as Allorder;
  Order:FoodOrder={} as FoodOrder;
  imagepath=environment.imagepath+"Restaurantprofile/";
  constructor(private orderservice:OrderService,private router: Router) { }

  ngOnInit() {
    debugger;
    
    this.cart=JSON.parse(localStorage.getItem('cart'));
    this.address=localStorage.getItem('address');
    this.restaurantname=localStorage.getItem('restaurantname');
    this.rstimg=localStorage.getItem('restaurantimg');
  }
  ConfirmOrder(){
    debugger;
    var token= localStorage.getItem('token');
    if(token==null||token==""||token==undefined){
      this.router.navigate(['/login']);
    }
    else{
      this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      this.allorder.Location=localStorage.getItem("latlng");
      this.allorder.Address=localStorage.getItem('address');
      this.allorder.OrderType="Restaurant";
      this.allorder.PaymentType="Cash";
      this.allorder.Consumer_Id=parseInt(localStorage.getItem('ID'));
      this.cart.allorder=this.allorder;
      this.Order.RestaurantID=parseInt(localStorage.getItem('restaurantid'));
      this.cart.Order=this.Order;
      var obj={"allorder":this.cart.allorder,"Order":this.cart.Order,"OrderItems":this.cart.OrderItems,"OrderBilling":this.cart.OrderBilling}
     
   this.orderservice.PostOrder(obj).subscribe((next:any)=>{
    this.clearcart();
    alert("Order Successfully placed");
   }
   );
    }
  

}
clearcart(){
  debugger;
  this.cart.OrderItems=null;
  this.cart.OrderBilling=null;
  this.cart.Order=null;
  localStorage.removeItem('cart');
  localStorage.setItem('cart',JSON.stringify(this.cart));
}
}
