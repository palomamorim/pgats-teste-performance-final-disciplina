
export function randomEmail(){
    return `user${Math.random().toString(20).substring(2,10)}@test.com`;
}
