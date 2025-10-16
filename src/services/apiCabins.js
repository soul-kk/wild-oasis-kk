import supabase, { supabaseUrl } from './supabase';

//获取cabin表中所有的row
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

//删除指定cabin
export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. 创建并上传cabin字段
  let query = supabase.from('cabins');

  //  create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //  edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  //2. 上传真正的图片文件
  if (hasImagePath) return data;

  const { storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3. 如果第二步出现问题，删除这个cabin
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error("cabin image can't upload to the storage");
  }

  return data;
}
