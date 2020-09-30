

def budget_management(limit_price, prices=None):
     prices = dict(prices)
     if prices is not None:
          for _, v in prices.items():
               limit_price -= v
     return limit_price


def schedule_management():
     return


if __name__ == '__main__':
     limit_price = 300000
     test = {
          'test': 100000,
          'test2': 100000,
     }
     print(type(test))
     price = budget_management(limit_price, test)
     print(price)

