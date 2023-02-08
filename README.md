# <p align="center">GitBase</p>
> This is a node package created by [**Manwil Bahaa Zaki**](https://www.linkedin.com/in/manwil-bahaa-zaki-kouzman-519701202/) that provides **CRUD** functionality to files on your **GitHub** account such that you can use it as a **Cloud Hosted Storage bucket** to save all your files for **Free**

## <p align="center">Steps to setup your github for GitBase</p>
- **Login** your github account
- Go to **setting page**
- Scroll down to `Developer Settings`
- under `personal access tokens` create a token (classic)
- under the `generate new token` tab choose `Generate new token (classic)`
- you will be prompted to confirm access
- **(optional)** `Note` is hust a name so you can identify what the token is actually for
- for `expiration` choose token access period
- **As for scopes make sure  `repo` is selected**
- click on `generate token`
- copy the newly generated token and store it as you will need this token to access your GitHub. It should look something like 

<p align="center"><b>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</b></p>

## <p align="center">Installation</p>
install by running the following command in terminal `npm i @manwil-zaki/gitbase`

## <p align="center">Usage</p>
- first you need to require the package

```ruby
const gitbase = require('@manwil-zaki/gitbase')
```

- next we need to define some constants
    - first you need to create a repositor **manually** . this will be the root of your bucket
    ```ruby
    let base = "https://api.github.com/repos/{github username}/{repo name}/contents/"
    ```
    - next you need to define the access key. howeverit is strongly advised to store your key as an **environment variable**
    ```ruby
    let key = 'Bearer {access key}'

    #example if key is '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' then
    let key='Bearer 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'
    ```
    - next the path contains the location of the file to be created. treat it as you normally do in file directory
    ```ruby
    #this path will create a txt file named "test" in a folder named "USERS" 
    let path = `USERS/test.txt`
    ```
- These are the list of functions available in version 1.0.0 of this module
    - **git_read(base , path , key)**
    - **git_create(base , path , key, data)**
    - **git_update(base , path , key , data)**
    - **git_delete(base , path , key)**

### - **git_read**
takes parameters **base**,**path**,**key**
```ruby
async function getFILE(){
    let created = await gitbase.git_read(base,path,key)
    console.log('STATUS : ',created)
}
gitFILE()
```

### - **git_create**
takes parameters **base**,**path**,**key** ,**data** (string)
```ruby
async function createFILE(){
    let created = await gitbase.git_create(base,path,key,'Hello world')

    #for json use JSON.stringify() to convert json to string
    console.log('STATUS : ',created)
}
createFILE()
```

### - **git_update**
takes parameters **base**,**path**,**key** ,**data** (string)
```ruby
async function updateFILE(){
    let updated = await gitbase.git_update(base,path,key,'Updated file content')

    #for json use JSON.stringify() to convert json to string
    console.log('STATUS : ',updated)
}
updateFILE()
```

### - **git_delete**
takes parameters **base**,**path**,**key** 
```ruby
async function deleteFILE(){
    let deleted = await gitbase.git_delete(base,path,key)
    console.log('STATUS : ',deleted)
}
deleteFILE()
```
