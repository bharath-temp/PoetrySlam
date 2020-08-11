from uuid import uuid4

import stringcase
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy_utils import UUIDType


class SurrogatePK(object):
    @declared_attr
    def __tablename__(cls):
        return stringcase.snakecase(cls.__name__)

    id = sa.Column(UUIDType(binary=False), primary_key=True, index=True,
                   default=uuid4)
