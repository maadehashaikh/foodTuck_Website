export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "firstname", type: "string", title: "First Name" ,
    },
    {
      name: "lastname", type: "string", title: "Last Name" ,
    },
    {
      name: "email", type: "string", title: "Email" ,
    },
    {
      name: "phone", type: "string", title: "Phone" ,
    }
    ,{
      name: "address", type: "string", title: "address" ,      
    }
    ,
    {
      name:"zipcode",type:"string" , title:"zip code",
    }
    ,{
      name:"cartItems",
      title:"Cart Items",
      type:'array',
      of:[{type:'reference',to: {type:'food'}}]
    },
    {
      name:'total',
      title:'Total Amount ',
      type:'number',
    }
    ,
    {
      name:'totalAfterDiscount',
      title:'Total Amount After Discount',
      type:'number',
    }
    ,
    {
      name:'discount',
      title:'Discount',
      type:'string',
    }
    ,
    {
      name:'status',
      title:'Order status',
      type:'string',
      options:{
        list:[
          {title:'Pending',value:'pending'},
          {title:'Success',value:'success'},
          {title:'Dispatch',value:'dispatch'}],
          layout:'radio'
      },
      initialValue:'pending'
    }
  ],
};
