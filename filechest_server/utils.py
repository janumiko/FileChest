
def file_upload_function(instance, filename: str):
    folder = instance.folder
    upload_path = f'{folder.path}/{folder.name}/{filename}'

    return upload_path
