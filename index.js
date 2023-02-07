const axios = require('axios').default;

exports.git_delete= async (base , path , key)=>{
  let file=await this.git_read(base,path,key)
  let status
  if(file.status){
    const metadata = JSON.stringify({
      message: 'gitbase DELETE',
      sha:file.sha
    })
    const config = {
      method: 'delete',
      url: base + path,
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json'
      },
      data: metadata
    };
    await axios(config)
      .then(response => {
       // console.log('gitbase : delete done')
        status=true
      })
      .catch(error=>{
        console.log('gitbase : error => ',error.response.data)
        status= false
      })
  }else{
    console.log('gitbase : data not found')
    status=false
  }
  return {status}
}

exports.git_read=async (base , path , key)=>{
  try{
    let data,sha,status
    const config = {
      method: 'get',
      url: base + path,
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json'
      }
    };
    await axios(config)
      .then(response => {
        data=Buffer.from(response.data.content, 'base64').toString()
        sha=response.data.sha
        status=true
      })
      .catch(error => {
        status= false
      });
    return {data , sha , status}
  }catch(err){
    console.log('gitbase : error => ',err.response.data)
  }
}

exports.git_create=async (base , path , key , data)=>{
  let status
  const metadata = JSON.stringify({
    message: 'gitbase CREATE',
    content:Buffer.from(data).toString('base64')
  })
    const config = {
      method: 'put',
      url: base + path,
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json'
      },
      data: metadata
    };
  await axios(config)
    .then(response => {
     //console.log('gitbase : create success')
     status=true
    })
    .catch(error => {
      console.log('gitbase : error => ',error.response.data);
      status=false
    });
    return {status}
}

exports.git_update=async (base , path , key , data)=>{
  let status
  let file=await this.git_read(base , path , key)
  const metadata = JSON.stringify({
    message: 'gitbase UPDATE',
    sha:file.sha,
    content: Buffer.from(data).toString('base64')
  })
    const config = {
      method: 'put',
      url: base + path,
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json'
      },
      data: metadata
    };
  await axios(config)
    .then(response => {
    // console.log('gitbase : update success')
     status=true
    })
    .catch(error => {
      status= false
      console.log('gitbase : error => ',error.response.data)
    });
    return {status}
}