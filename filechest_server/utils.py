
def file_upload_function(instance, filename: str):
    """
    This function is used to generate the path for the file to be uploaded to.

    Args:
        instance: The instance of the FileModel.
        filename: The name of the file.

    Returns:
        The path to upload the file to.
    """

    folder = instance.folder
    upload_path = f'{folder.path}/{folder.name}/{filename}'

    return upload_path
