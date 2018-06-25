import click
from scholar_cloud_backend.services.app import app


@click.command()
def run_server():
    app.run('0.0.0.0', debug=True)
