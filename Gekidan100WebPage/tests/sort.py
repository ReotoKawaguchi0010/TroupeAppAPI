from pymongo import MongoClient
from pymongo import collection

client = MongoClient('mongodb://localhost:27017/')
db = client['test_database']

stack1 = {
    'name': 'test',
    'os': 'mac',
}

if __name__ == '__main__':
    # for i in range(3, -1, -1):
    #     print(i)

    db_stack: collection.Collection = db.stacks
    #stack_id = db_stack.insert_one(stack1)
    print(db_stack)