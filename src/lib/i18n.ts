let dictionary:Record<string,string>|undefined;
/** Messages are embedded in each static page, before its module scripts run. */
export function t(message:string,values:Record<string,string|number>={}) {
  dictionary??=JSON.parse(document.getElementById('locale-messages')?.textContent??'{}');
  const template=dictionary?.[message]??message;
  return template.replace(/\{(\w+)\}/g,(token,key)=>String(values[key]??token));
}
