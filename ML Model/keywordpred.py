import numpy as np
import pandas as pd
import statistics
import stopwords
import fitt
import probab
import predsinglepoint

stop_words = stopwords.stopwordss()

# def predict(dictionary, x_test):
#     y_pred = []
#     for x in x_test:
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

xyz = set(df.disposition)

print(xyz)

y_train = np.array(df.decision_type)
x_train = df.drop('decision_type', axis=1)
x_train = np.array(x_train)
for i in range(0, 3303, 1):
    x_train[i][1] = (x_train[i][1])[3:-5]
x_data = x_train[:, 1]

diction = {}
k = 1000
for it in x_data:
    currlist = it.split(" ")
    for itr in currlist:
        if (itr in stop_words):
            continue
        if (itr in diction.keys()):
            diction[itr] += 1
        else:
            diction[itr] = 1

diction = dict(sorted(diction.items(), key=lambda item: item[1], reverse=True))
features = dict(list(diction.items())[0: k])
feat_keys = list(features.keys())

idx = {}
for i in range(0, len(feat_keys)):
    idx[feat_keys[i]] = i

x_train = []

for it in x_data:
    currlist = (it.split(" "))
    curr_x_train = [0] * 1000
    for itr in feat_keys:
        curr_x_train[idx[itr]] = currlist.count(itr)
    x_train.append(curr_x_train)

x_train = np.array(x_train)

dictionary = fitt.fit(x_train, y_train)

y_pred = predsinglepoint.predictSinglePoint(dictionary, x_train[0])

print(y_pred)

# from sklearn.metrics import accuracy_score

# print(accuracy_score(y_train, y_pred))
