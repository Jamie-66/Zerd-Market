$(function(){

	Vue.filter('addCount',function(value){
		var count = 0;
		for(var i=0; i<value.length; i++){
			count += value[i].count * 1;
		}
		return count;
	})
	Vue.filter('addPrice',function(value){
		var price = 0;
		for(var i=0; i<value.length; i++){
			price += value[i].price * value[i].count * 1;
		}
		return price;
	})

	var Order = new Vue({
		el: '#body',
		data: {
			str: '',
			orders: [],
			allPrice: 0,
			allCount: 0,
			Msg: {},
			address: '',
			payway: '微信支付',
			invoice: '',
			notes: '',
			userWord: [],
			isintegral: false,
			integral: 200,
			update_time: '',
			url: common.imgUrl
		},
		methods: {
			payforselect: function(event){
				$('.pay-mask').removeClass('item-hidden');
				$('.payfor').removeClass('item-hidden');
			},
			payWay: function(event){
				$(event.target).parent().addClass('item-hidden');
				$('.pay-mask').addClass('item-hidden');
				this.payway = $(event.target).text();
			},
			maskHide: function(event){
				$(event.target).addClass('item-hidden');
				$('.payfor').addClass('item-hidden');
			},
			submit: function(event){
				$('.mask').removeClass('item-hidden');
				var arrmsg = [];
				var sub = {};
				var self = this;
				if(!this.isintegral){
					this.integral = 0;
				}else{
					this.integral = 200;
				}
				var d = new Date();
				var _registerTime = d.toLocaleDateString() + d.toLocaleTimeString();
				$.each($('.myorder'),function(_ind,_e){
					var objmsg = {
						account: self.Msg.user_id,
						phone: self.Msg.phone,
						address: self.Msg.address,
						payway: self.payway,
						integral: self.integral,
						create_time: _registerTime,
						state: 1,
						update_time: ''
					};
					objmsg['store_id'] = $(_e).attr('items');
					
					$.each($(_e).find('input'),function(_inde,_el){
						sub[$(_el).attr('items')] = $(_el).val();
					})

					var minarr = [];
					$.each($(_e).find('.productlist'),function(_index,_ele){
						var objmsg1 = {};
						objmsg1['pro_id'] = $(_ele).attr('items');
						objmsg1['order_img'] = self.orders[_ind][_index].item_img;
						objmsg1['title'] = self.orders[_ind][_index].title;
						objmsg1['price'] = self.orders[_ind][_index].price;
						objmsg1['count'] = self.orders[_ind][_index].count;
						if(self.orders[_ind][_index].totalprice){
							objmsg1['totalPrice'] = self.orders[_ind][_index].totalprice;
						}else{
							objmsg1['totalPrice'] = self.orders[_ind][_index].price * self.orders[_ind][_index].count *1;
						}
						
						minarr.push($.extend(false,objmsg,sub,objmsg1));
					})
					arrmsg.push(minarr);
				})
				// console.log(arrmsg)
				$.post(common.baseUrl + 'cart_order.php',{msg: arrmsg}).success(function(response){
					$('.mask').addClass('item-hidden');
					$.alert(JSON.parse(response).message,"温馨提示");
					if(JSON.parse(response).state){
						window.location.href = "orders.html";
					}
				})
			}
		},
		ready: function(){
			var str1 = localStorage.getItem("orderMsg");
			this.orders = JSON.parse(str1);
			var price = 0;
			
			for(var j=0; j<this.orders.length; j++){
				for(var i=0; i<this.orders[j].length; i++){
					this.allPrice += this.orders[j][i].price * this.orders[j][i].count * 1;
					this.allCount += this.orders[j][i].count*1;
				}
			}
			var self = this;
			$.get(common.baseUrl + 'getaddress.php').success(function(response){
				self.Msg = JSON.parse(response);
			})
		},
		directives: {

		}
	});
})