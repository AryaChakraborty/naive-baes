import numpy as np
import pandas as pd
import statistics
import stopwords
import fitt
import predsinglepoint


stop_words = stopwords.stopwordss()

def makedict1(data) :
    result = {}
    # article
    article_col = data[:, 0]
    article_values = set(article_col)
    for article in article_values :
        result[article] = {}
        # place
        place_col = data[:, 1]
        place_values = set(place_col)
        for place in place_values :
            result[article][place] = {}
            # year
            year_col = data[:, 2]
            year_values = set(year_col)
            for year in year_values :
                result[article][place][year] = {}
                # month
                month_col = data[:, 3]
                month_values = set(month_col)
                for month in month_values :
                    result[article][place][year][month] = [] # similiar items, thumbnail
    
    length = data.shape[0]
    for i in range(0 ,length, 1) :
        result[data[i][0]][data[i][1]][data[i][2]][data[i][3]].append((data[i][4]).split('.')[0])
    return result

def makedict2(data) :
    result = {}
    # article
    article_col = data[:, 0]
    article_values = set(article_col)
    for article in article_values :
        result[article] = {}
        # place
        place_col = data[:, 1]
        place_values = set(place_col)
        for place in place_values :
            result[article][place] = {}
            # year
            year_col = data[:, 2]
            year_values = set(year_col)
            for year in year_values :
                result[article][place][year] = []
    
    length = data.shape[0]
    for i in range(0 ,length, 1) :
        result[data[i][0]][data[i][1]][data[i][2]].append((data[i][4]).split('.')[0])
    return result

def makedict3(data) :
    result = {}
    # article
    article_col = data[:, 0]
    article_values = set(article_col)
    for article in article_values :
        result[article] = {}
        # place
        place_col = data[:, 1]
        place_values = set(place_col)
        for place in place_values :
            result[article][place] = []
    
    length = data.shape[0]
    for i in range(0 ,length, 1) :
        result[data[i][0]][data[i][1]].append((data[i][4]).split('.')[0])
    return result

def makedict4(data) :
    result = {}
    # article
    article_col = data[:, 0]
    article_values = set(article_col)
    for article in article_values :
        result[article] = []
    
    length = data.shape[0]
    for i in range(0 ,length, 1) :
        result[data[i][0]].append((data[i][4]).split('.')[0])
    return result

data = pd.read_csv("data_submission.csv") # subject to change
data = np.array(data)

print(data)

month_set = set(data[:, 3])
year_set = set(data[:, 2])
place_set = set(data[:, 1])
article_set = set(data[:, 0])

# def find_similar(x, k) :
#     curr_article = x[0]
#     curr_place = x[1]
#     curr_year = x[2]
#     curr_month = x[3]
    
#     similar_item1 = []
#     similar_item2 = []
#     similar_item3 = []
#     similar_item4 = []
#     similar_item5 = []
    
#     if curr_article in article_set :
#         if curr_place in place_set :
#             if curr_year in year_set :
#                 if curr_month in month_set :
#                     similar_item1 = (makedict1(data))[curr_article][curr_place][curr_year][curr_month]
#                 else :
#                     similar_item2 = (makedict2(data))[curr_article][curr_place][curr_year]
#             else :
#                 similar_item3 = (makedict3(data))[curr_article][curr_place]
#         else :
#             similar_item4 = (makedict4(data))[curr_article]
#     else :
#         similiar_item5 = []
    
#     similar_item = similar_item1 + similar_item2 + similar_item3 + similar_item4 + similar_item5
#     similar_item = set(similar_item)
#     similar_item = list(similar_item)
#     if(len(similar_item) > k) :
#         return similar_item[0:k]
#     return similar_item

def find_similar(x, k) :
    curr_article = x[0]
    curr_place = x[1]
    curr_year = x[2]
    curr_month = x[3]
    
    similar_item1 = []
    similar_item2 = []
    similar_item3 = []
    similar_item4 = []
    similar_item5 = []
    
    if curr_article in article_set :
        similar_item4 = (makedict4(data))[curr_article]
        if curr_place in place_set :
            similar_item3 = (makedict3(data))[curr_article][curr_place]
            if curr_year in year_set :
                similar_item2 = (makedict2(data))[curr_article][curr_place][curr_year]
                if curr_month in month_set :
                    similar_item1 = (makedict1(data))[curr_article][curr_place][curr_year][curr_month]
    
    
    similar_item = similar_item1 + similar_item2 + similar_item3 + similar_item4 + similar_item5
    similar_item = set(similar_item)
    similar_item = list(similar_item)
    if(len(similar_item) > k) :
        return similar_item[0:k]
    return similar_item


# def predict(dictionary, x_test) :
#     y_pred = []
#     for x in x_test :
#         x_class = predictSinglePoint(dictionary, x)
#         y_pred.append(x_class)
#     return y_pred

df = pd.read_csv("justice.csv")
# df=df.replace(np.nan,'hello how are you')
df = df.drop(['Unnamed: 0', 'ID', 'name', 'href', 'docket', 'first_party', 'second_party', 'facts_len'], axis=1)

fill_val = (statistics.mode(df['issue_area']))
df['issue_area'] = df['issue_area'].fillna(fill_val)

fill_val = (statistics.mode(df['disposition']))
df['disposition'] = df['disposition'].fillna(fill_val)

fill_val = (statistics.mode(df['decision_type']))
df['decision_type'] = df['decision_type'].fillna(fill_val)

fill_val = (statistics.mode(df['first_party_winner']))
df['first_party_winner'] = df['first_party_winner'].fillna(fill_val)

print(df)

xyz = set(df.disposition)

print(xyz)

y_train = np.array(df.decision_type)
y_train1 = np.array(df.disposition)
y_train2 = np.array(df.issue_area)
y_train3 = np.array(df.first_party_winner)
# y_train4 = np.array(df.decision_type)
x_train = df.drop('decision_type', axis=1)
x_train = np.array(x_train)
for i in range (0, 3303, 1) :
    x_train[i][1] = (x_train[i][1])[3:-5]
x_data = x_train[:, 1]

diction = {}
k = 1000
for it in x_data :
    currlist = it.split(" ")
    for itr in currlist :
        if(itr in stop_words) :
            continue
        if(itr in diction.keys()) :
            diction[itr] += 1
        else :
            diction[itr] = 1

diction = dict(sorted(diction.items(), key=lambda item: item[1], reverse=True))
features = dict(list(diction.items())[0: k])
feat_keys = list(features.keys())

idx = {}
for i in range(0, len(feat_keys)) :
    idx[feat_keys[i]] = i


x_train = []

for it in x_data :
    currlist = (it.split(" "))
    curr_x_train = [0]*1000
    for itr in feat_keys :
        curr_x_train[idx[itr]] = currlist.count(itr)
    x_train.append(curr_x_train)

x_train = np.array(x_train)

dictionary = fitt.fit(x_train, y_train)
dictionary1 = fitt.fit(x_train, y_train1)
dictionary2 = fitt.fit(x_train, y_train2)
dictionary3 = fitt.fit(x_train, y_train3)

y_pred3 = predsinglepoint.predictSinglePoint(dictionary3, x_train[0])
y_pred2 = predsinglepoint.predictSinglePoint(dictionary2, x_train[0])
y_pred1 = predsinglepoint.predictSinglePoint(dictionary1, x_train[0])
y_pred = predsinglepoint.predictSinglePoint(dictionary, x_train[0])
print(y_pred,",", y_pred1,",", y_pred2,",", y_pred3)


answer = find_similar([121, 'Kolkata', 2001, 12], 10)
print(answer)

