# Instructions

1. Change JAVA_HOME (JDK) to point to a version >= 17.0
2. Ensure .m2/settings.xml is unset, using central maven repository!

Database design
[Alt text](https://i.stack.imgur.com/rt26N.png)

# TODO 

1. move user oidcToken to a new sub-table. we don't want to grep through a lot of data just to oauth
2. streamline the APIs so that they all reference the UserItem::id and every module will hook to UserUtil to fetch UserItem based on UserItem::id
3. get postman outh client working