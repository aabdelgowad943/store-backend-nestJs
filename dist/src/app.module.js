"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const user_module_1 = require("./resources/user/user.module");
const book_module_1 = require("./resources/book/book.module");
const order_module_1 = require("./resources/order/order.module");
const voucher_module_1 = require("./resources/voucher/voucher.module");
const statistics_module_1 = require("./resources/statistics/statistics.module");
const auth_module_1 = require("./auth/auth.module");
const cart_module_1 = require("./resources/cart/cart.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            cart_module_1.CartModule,
            book_module_1.BookModule,
            order_module_1.OrderModule,
            voucher_module_1.VoucherModule,
            statistics_module_1.StatisticsModule,
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map