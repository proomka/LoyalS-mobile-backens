0.1 все запросы отправлять на сервер с .headers.authtoken = токен с фб
0.2 при запуске приложения отправлять запрос на фб для получения токена
0.3 Регистрация в firebase (хз какие данные надо, я скину)
0.4 После реги отправить /user/register c .headers.authtoken = токен с фб

1. ФОТО
    на все фото ссылка /photo/filename.png
    из бд все ссылки на фото в нормальном формате, ничего с ними делать не надо

2. запрос чекина
    /place/check?place=placeID&user=userID&coins=coins
    (+) - "You got 2000 coins"
    (-) - status 403 + error

3. запрос информации по профилю
    /user
    (+) - {
        id = int,
        nickname = str,
        email = str,
        coins = int,
        photo_path = str,
        date_of_reg = data(str),
        date_of_birth = data(str)
    }
    (-) - status 403 + "Bad uid"

4. запрос покупки купона
    /coupon/buy?user=userID&coupon=couponID
    (+) - "OK"
    (-) - status 403 "Insufficient funds in your account"
          status 403 "Coupon was used"

5. запрос на регистрацию (пункт 0.4)
    /user/register
    (+) - "User has successfully registered"
    (-) - status 403 + "Error: ", error
          status 403 + "Error fetching user data:", error

6. запрос изменения данных пользователя
    /user/update_data?nickname=new_nickname&date_of_birth=new_date_of_birth
    (+) - "Data updated"
    (-) - "Error: ", err

7. запрос просмотра всех своих использованных купонов
    /user/used_coupons
    (+) - data[{
        Coupons.name = str,
        Places.name = str,
        price = int,
        date_of_use = Data(str)
    }]
    (-) - 403 "Bad uid"

8. запрос по доступным купонам
    /coupon/:city
    (+) - (хз что из этого вам нужно будет)
        [{coupons.Id, coupons.price, coupons.description, coupons.name, coupons.photo_path, places.name, places.rating, places.adress, places.phone_num, places.price_seg, places.category}]

9. запрос мест по категории (список мест, и информация по каждому месту)
    /place/:category
    (+) - data [{}]
